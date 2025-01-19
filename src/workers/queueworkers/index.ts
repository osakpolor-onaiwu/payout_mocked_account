import createaccounts from "./createaccount";

interface IStringIndex {
  [key: string]: any;
}

interface Data {
  worker: string;
  worker_data: { [key: string]: string | number };
  cron_setting: { limit?: number; interval: number };
  started: boolean;
  stopped: boolean;
}

const worker_list: IStringIndex = {
  createaccount: (Data: Data) => createaccounts(Data),
};

const abstraction = async (data: any) => {
  let worker;
  if (data.worker && typeof data.worker === "string") {
    worker = worker_list[`${data?.worker}`](data);
  }
  return worker;
};

export default abstraction;
