/*
1. 실행 환경을 local로 정한다.
2. local 환경에 맞는 설정 파일(configs/conf/local.yml)이 있는지 검사한다.
3. 파일이 있으면 그 경로를 가져오고, 없으면 undefined를 가져온다.
4. 경로가 있으면 해당 YAML 파일을 읽어 객체로 만들고, 없으면 빈 객체를 만든다.
5. 최종적으로 만들어진 설정 객체를 반환한다.
*/

import { existsSync } from 'fs'; // 파일 존재 여부 확인을 위한 모듈
import { join } from 'path'; // 경로 조작을 위한 모듈
import YAML = require('yamljs'); // YAML 파일을 읽기 위한 모듈
import { Config } from '.'; 

// 환경 변수 타입 정의
enum Env {
  local = 'local',
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

// _checkConfigFile - 주어진 환경에 따라 설정 파일 경로를 확인
// @param {Env} env - 환경 변수 (local, dev, qa, prd 중 하나)
// @returns {string | undefined} - 설정 파일 경로 또는 undefined

const _checkConfigFile = (env?: Env): string | undefined => {
  const fileName = env ? `${env}.yml` : 'local.yml';
  const filePath = join(process.cwd(), 'configs', 'conf', fileName);
  console.log(filePath);
  return existsSync(filePath) === true ? filePath : undefined;
};

// _loadConfig - 주어진 파일 경로에서 YAML 파일을 읽어 객체로 변환
// @param {string | undefined} filePath - YAML 파일 경로
// @returns {T} - YAML 파일에서 읽은 객체 

const _loadConfig = <T = Record<string, any>>(filePath: string | undefined): T => {
  return filePath ? YAML.load(filePath) : ({} as T);
};

// export default - 환경에 따라 설정 파일을 읽어 Config 객체를 반환
// @returns {Config} - Config 객체 

export default (): Config => {
  const env = Env.local;
  const envConfigFile = _checkConfigFile(env);
  const envConfig = _loadConfig(envConfigFile);
  return envConfig as Config;
};