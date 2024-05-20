/* eslint-disable no-console */
class ConsoleLogger {
  constructor() {}

  static logDev(param1?: any, _param2?: any) {
    console.log("%cMode dev :", "color: blue; font-weight: bold;", param1);
  }

  static logErr(param1?: any) {
    console.error("%cMode err :", "color: blue; font-weight: bold;", param1);
  }

  static logEvt(param1?: any) {
    console.log("%cMode evt :", "color: blue; font-weight: bold;", param1);
  }
}

export default ConsoleLogger;
