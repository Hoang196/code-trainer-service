import jwt from 'jsonwebtoken';
import config from 'config';
import { UserModel } from 'models';
import { AuthDto, ChangePasswordDto, ForgetPasswordDto, RefreshDto } from './dtos';
import { UserNotFound, ForbiddenException, UserNotAuthorizedException } from 'exceptions';
import { decrypt, encrypt } from 'utils/aes';
import nodemailer from 'nodemailer';

const checkEmail = async (user: AuthDto) => {
  const { email } = user;
  const data = await UserModel.findOne({ email, active: true });
  return !!data;
};

const login = async (user: AuthDto) => {
  const { email, password } = user;
  const data = await UserModel.findOne({ email, active: true });
  if (data) {
    const passwordDeCrypt = decrypt(data.password);
    if (password === passwordDeCrypt) {
      const result = {
        accessToken: jwt.sign(data.toJSON(), config.jwtAccessSecretKey, { expiresIn: '23h' }),
        refreshToken: jwt.sign(data.toJSON(), config.jwtRefreshSecretKey),
      };
      return {
        id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
        ...result,
      };
    }
  } else {
    throw new UserNotFound();
  }
};

const refresh = async (data: RefreshDto) => {
  const refreshToken = data.refreshToken;
  if (!refreshToken) {
    throw new UserNotAuthorizedException();
  }
  const result = jwt.verify(data.refreshToken, config.jwtRefreshSecretKey, (err, res) => {
    if (err) {
      throw new ForbiddenException();
    }
    const newToken = {
      accessToken: jwt.sign(res, config.jwtAccessSecretKey, { expiresIn: '23h' }),
      refreshToken: jwt.sign(res, config.jwtRefreshSecretKey),
    };
    return newToken;
  });
  return result;
};

const changePassword = async (data: ChangePasswordDto) => {
  const { id, password, newPassword } = data;
  const userSearch = await UserModel.findOne({ _id: id });
  const oldPassword = decrypt(userSearch.password);
  if (oldPassword === password) {
    const newPass = encrypt(newPassword);
    const user = UserModel.findOneAndUpdate({ _id: id }, { password: newPass });
    return user;
  } else {
    throw new UserNotFound();
  }
};

const forgetPassword = async (data: ForgetPasswordDto) => {
  const { email } = data;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'besttopuet@gmail.com',
      pass: 'H20041906H',
    },
  });
  const mailOptions = {
    from: 'besttopuet@gmail.com',
    to: email,
    subject: 'Code Practise provide new password',
    text: 'This is your new password!',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error when send mail: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export { checkEmail, login, refresh, changePassword, forgetPassword };
