/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosRequestConfig } from 'axios';
import Config from 'config';
import requestRapidResource from 'utils/rapid';
import _ from 'lodash';
import logger from 'logger';
import InternalServiceException from 'exceptions/InternalServiceException';
import { Language, Param } from 'utils/constants/Compiler';
import TestCaseModel from 'models/testcase';
import { ExerciseModel, ScoreModel } from 'models';
import { SubmissionHistoryModel } from 'models';

const compileCode = async (data: any) => {
  const { user, exercise, language, content, typeCompiler } = data;
  let arrayNumNum: any = [];
  let arrayStrStr: any = [];
  let num: any = [];
  let str: any = [];
  let arrayNum: any = [];
  let arrayStr: any = [];
  let array2DNum: any = [];
  let array2DStr: any = [];
  let array2DResult: any = [];
  let scriptTestCase: string = '';
  let stringParam: any = [];
  let callFunction: string = '';

  // Read and Convert all testcase from database to array
  const dataExercise = await ExerciseModel.findOne({ _id: exercise, active: true });
  const listTestcase = await TestCaseModel.find({ exercise: exercise, active: true });
  const params = listTestcase?.[0]?.params;
  let testcases;
  if (typeCompiler === 'RUN') {
    testcases = [
      {
        input: dataExercise?.sample_input,
        output: dataExercise?.sample_output,
      },
    ];
  } else {
    testcases = listTestcase;
  }
  console.log('ndh test testcase', testcases);
  for (let i = 0; i < testcases?.length; i++) {
    const splitTest = testcases?.[i]?.input?.split('\n');
    if (splitTest?.length > 0) {
      for (let j = 0; j < params?.length; j++) {
        let arrayTests: any;
        if (params[j] === Param.ARRAY_NUMBER_2D) {
          arrayTests = [];
          for (let k = 0; k < splitTest?.length; k++) {
            splitTest[k] = `{ ${splitTest[k].split(' ')} }`;
            arrayTests.push(splitTest[k]);
          }
        } else if (params[j] === Param.ARRAY_STRING_2D) {
          arrayTests = [];
          for (let k = 0; k < splitTest?.length; k++) {
            const temp = splitTest[k].split(' ');
            splitTest[k] = `{ ${temp.map((t: any) => `"${t}"`)} }`;
            arrayTests.push(splitTest[k]);
          }
        } else if (params[j] === Param.ARRAY_STRING) {
          arrayTests = splitTest[j]?.split(' ');
          for (let k = 0; k < arrayTests?.length; k++) {
            arrayTests[k] = `"${arrayTests[k]}"`;
          }
        } else {
          arrayTests = splitTest[j]?.split(' ');
        }
        const convertArrayTests = `{ ${arrayTests?.toString()} }`;
        switch (params[j]) {
          case Param.NUMBER:
            num.push(splitTest[j]);
            break;
          case Param.STRING:
            str.push(splitTest[j]);
            break;
          case Param.ARRAY_NUMBER:
            arrayNum.push(convertArrayTests);
            break;
          case Param.ARRAY_STRING:
            arrayStr.push(convertArrayTests);
            break;
          case Param.ARRAY_NUMBER_2D:
            array2DNum.push(convertArrayTests);
            break;
          case Param.ARRAY_STRING_2D:
            array2DStr.push(convertArrayTests);
            break;
          default:
            break;
        }
      }
      if (array2DNum.length > 0) {
        arrayNumNum.push(array2DNum.toString());
        array2DNum = [];
      }
      if (array2DStr.length > 0) {
        arrayStrStr.push(array2DStr.toString());
        array2DStr = [];
      }
    }
    array2DResult.push(testcases[i].output);

    if (language === 'Java') {
      for (let p = 0; p < params?.length; p++) {
        switch (params[p]) {
          case Param.NUMBER:
            if (num[p]?.includes('.')) {
              scriptTestCase += `double a${i}${p} = ${num[p]}; `;
              stringParam.push(`double a${i}${p}`);
            } else {
              scriptTestCase += `int a${i}${p} = ${num[p]}; `;
              stringParam.push(`int a${i}${p}`);
            }
            break;
          case Param.STRING:
            scriptTestCase += `String b${i}${p} = "${str[p]}"; `;
            stringParam.push(`String b${i}${p}`);
            break;
          case Param.ARRAY_NUMBER:
            if (arrayNum[i]?.includes('.')) {
              scriptTestCase += `double[] c${i}${p} = ${arrayNum[p]}; `;
              stringParam.push(`double[] c${i}${p}`);
            } else {
              scriptTestCase += `int[] c${i}${p} = ${arrayNum[p]}; `;
              stringParam.push(`int[] c${i}${p}`);
            }
            break;
          case Param.ARRAY_STRING:
            scriptTestCase += `String[] d${i}${p} = ${arrayStr[p]}; `;
            stringParam.push(`String[] d${i}${p}`);
            break;
          case Param.ARRAY_NUMBER_2D:
            if (arrayNumNum[i]?.includes('.')) {
              scriptTestCase += `double[][] e${i}${p} = ${arrayNumNum[p]}; `;
              stringParam.push(`double[][] e${i}${p}`);
            } else {
              scriptTestCase += `int[][] e${i}${p} = ${arrayNumNum[p]}; `;
              stringParam.push(`int[][] e${i}${p}`);
            }
            break;
          case Param.ARRAY_STRING_2D:
            scriptTestCase += `String[][] f${i}${p} = ${arrayStrStr[p]}; `;
            stringParam.push(`String[][] f${i}${p}`);
            break;
          default:
            break;
        }
      }

      console.log('ndh test arrayNum', array2DNum);
      console.log('ndh test stringParam', stringParam);
      stringParam = _.uniq(stringParam);
      const param = [];
      for (let j = 0; j < stringParam.length; j++) {
        const va = stringParam[j].split(' ');
        param.push(`${va[1]}`);
      }
      stringParam = [];
      num = [];
      str = [];
      arrayNum = [];
      arrayStr = [];
      arrayNumNum = [];
      arrayStrStr = [];
      if (dataExercise?.type_function === 'void') {
        callFunction += `${dataExercise?.name_function}(${param.toString()}); System.out.println(); `;
      } else {
        callFunction += `System.out.println(${dataExercise?.name_function}(${param.toString()})); `;
      }

      console.log('ndh test params', params);
      console.log('ndh test scriptTestCase', scriptTestCase);
      console.log('ndh test callFunction', callFunction);
    } else if (language === 'Cpp') {
      for (let p = 0; p < params?.length; p++) {
        switch (params[p]) {
          case Param.NUMBER:
            if (num[p]?.includes('.')) {
              scriptTestCase += `double a${i}${p} = ${num[p]}; `;
              stringParam.push(`double a${i}${p}`);
            } else {
              scriptTestCase += `int a${i}${p} = ${num[p]}; `;
              stringParam.push(`int a${i}${p}`);
            }
            break;
          case Param.STRING:
            scriptTestCase += `string b${i}${p} = "${str[p]}"; `;
            stringParam.push(`string b${i}${p}`);
            break;
          case Param.ARRAY_NUMBER:
            if (arrayNum[i]?.includes('.')) {
              scriptTestCase += `double c${i}${p}[] = ${arrayNum[p]}; `;
              stringParam.push(`double c${i}${p}`);
            } else {
              scriptTestCase += `int c${i}${p}[] = ${arrayNum[p]}; `;
              stringParam.push(`int c${i}${p}`);
            }
            break;
          case Param.ARRAY_STRING:
            scriptTestCase += `string d${i}${p}[] = ${arrayStr[p]}; `;
            stringParam.push(`string d${i}${p}`);
            break;
          case Param.ARRAY_NUMBER_2D:
            if (arrayNumNum[i]?.includes('.')) {
              scriptTestCase += `vector<vector<double>> e${i}${p} = ${arrayNumNum[p]}; `;
              stringParam.push(`double e${i}${p}`);
            } else {
              scriptTestCase += `vector<vector<int>> e${i}${p} = ${arrayNumNum[p]}; `;
              stringParam.push(`int e${i}${p}`);
            }
            break;
          case Param.ARRAY_STRING_2D:
            scriptTestCase += `vector<vector<string>> f${i}${p} = ${arrayStrStr[p]}; `;
            stringParam.push(`string f${i}${p}`);
            break;
          default:
            break;
        }
      }

      console.log('ndh test num', num);
      console.log('ndh test stringParam', stringParam);
      stringParam = _.uniq(stringParam);
      const param = [];
      for (let j = 0; j < stringParam.length; j++) {
        const va = stringParam[j].split(' ');
        param.push(`${va[1]}`);
      }
      stringParam = [];
      num = [];
      str = [];
      arrayNum = [];
      arrayStr = [];
      arrayNumNum = [];
      arrayStrStr = [];
      if (dataExercise?.type_function === 'void') {
        callFunction += `${dataExercise?.name_function}(${param.toString()}); cout << endl; `;
      } else {
        callFunction += `cout << ${dataExercise?.name_function}(${param.toString()}) << endl; `;
      }

      console.log('ndh test params', params);
      console.log('ndh test scriptTestCase', scriptTestCase);
      console.log('ndh test callFunction', callFunction);
    } else {
      for (let p = 0; p < params?.length; p++) {
        switch (params[p]) {
          case Param.NUMBER:
            if (num[p]?.includes('.')) {
              scriptTestCase += `double a${i}${p} = ${num[p]}; `;
              stringParam.push(`double a${i}${p}`);
            } else {
              scriptTestCase += `int a${i}${p} = ${num[p]}; `;
              stringParam.push(`int a${i}${p}`);
            }
            break;
          case Param.STRING:
            scriptTestCase += `string b${i}${p} = "${str[p]}"; `;
            stringParam.push(`string b${i}${p}`);
            break;
          case Param.ARRAY_NUMBER:
            if (arrayNum[i]?.includes('.')) {
              scriptTestCase += `double c${i}${p}[] = ${arrayNum[p]}; `;
              stringParam.push(`double c${i}${p}`);
            } else {
              scriptTestCase += `int c${i}${p}[] = ${arrayNum[p]}; `;
              stringParam.push(`int c${i}${p}`);
            }
            break;
          default:
            break;
        }
      }

      console.log('ndh test arrayNum', array2DNum);
      console.log('ndh test stringParam', stringParam);
      stringParam = _.uniq(stringParam);
      const param = [];
      for (let j = 0; j < stringParam.length; j++) {
        const va = stringParam[j].split(' ');
        param.push(`${va[1]}`);
      }
      stringParam = [];
      num = [];
      str = [];
      arrayNum = [];
      if (dataExercise?.type_function === 'void') {
        callFunction += `${dataExercise?.name_function}(${param.toString()});`;
      } else {
        callFunction += `printf("%d ", ${dataExercise?.name_function}(${param.toString()}));`;
      }

      console.log('ndh test params', params);
      console.log('ndh test scriptTestCase', scriptTestCase);
      console.log('ndh test callFunction', callFunction);
    }
  }

  let scripts;
  if (language === 'Java') {
    scripts = `public class Main {
        ${content}
        public static void main(String[] args) {
          ${scriptTestCase}
          ${callFunction}
        }
      }
    `;
  } else if (language === 'Cpp') {
    scripts = `
      #include <bits/stdc++.h>
      using namespace std;
      ${content}
      int main() {
        ${scriptTestCase}
        ${callFunction}
      }
    `;
  } else {
    scripts = `
      #include <assert.h>
      #include <ctype.h>
      #include <limits.h>
      #include <math.h>
      #include <stdbool.h>
      #include <stddef.h>
      #include <stdint.h>
      #include <stdio.h>
      #include <stdlib.h>
      #include <string.h>
      ${content}
      int main() {
        ${scriptTestCase}
        ${callFunction}
        return 0;
      }
    `;
  }

  const program = {
    script: scripts,
    language: language === 'Java' ? Language?.JAVA : language === 'Cpp' ? Language?.CPP : Language?.C,
    versionIndex: Config.versionIndex,
    clientId: Config.clientID,
    clientSecret: Config.clientSecret,
  };

  const config: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json`,
    },
    data: program,
  };

  try {
    const res = await requestRapidResource(Config.service.compilerService, config);
    console.log('ndh test response', res);
    console.log('ndh test array2DResult', array2DResult);
    let formatRes: any;
    if (res?.output?.includes('\n')) {
      formatRes = res?.output.split('\n');
    } else {
      formatRes = res?.output.split(' ');
    }
    formatRes.pop();
    console.log('ndh test formatRes', formatRes);
    const results = array2DResult.map((item: any, index: number) => {
      const r = formatRes?.[index];
      return r?.toString() === item?.toString();
    });
    if (typeCompiler === 'SUBMIT') {
      const scoreRecord = await ScoreModel.findOne({ user: user, exercise: exercise });
      const resultTrue = results.filter((item: boolean) => item === true);
      const scoreResult = Math.round((resultTrue?.length / results?.length) * dataExercise?.max_score);
      const submission = {
        ...data,
        content,
        result: scoreResult,
      };
      await SubmissionHistoryModel.create(submission);
      if (scoreRecord) {
        if (scoreResult > scoreRecord?.score) {
          await ScoreModel.findOneAndUpdate({ _id: scoreRecord?._id }, { score: scoreResult });
        }
      } else {
        const dataScore = {
          user,
          exercise,
          score: scoreResult,
        };
        await ScoreModel.create(dataScore);
      }
    }
    return results;
  } catch (err) {
    logger.error(`[FETCH-COMPILER-MANAGEMENT] err: ${err.message}`);
    throw new InternalServiceException();
  }
};

export { compileCode };
