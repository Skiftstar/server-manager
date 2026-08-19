import cronstrue from "cronstrue";
import { exec } from "node:child_process";
import { CronTab } from "../types/cronTypes";
import { promisify } from "node:util";

const specials: { [key: string]: string } = {
  "@reboot": "On boot",
  "@yearly": "Once a year",
  "@annually": "Once a year",
  "@monthly": "Once a month",
  "@weekly": "Once a week",
  "@daily": "Every day at midnight",
  "@midnight": "Every day at midnight",
  "@hourly": "Every hour",
};

const cronToHumanReadableString = (cron: string) => {
  if (specials[cron]) return specials[cron];
  return cronstrue.toString(cron);
};

const execAsync = promisify(exec);

export const getCrontabs = async (): Promise<CronTab[]> => {
  try {
    const { stdout } = await execAsync("crontab -l");
    if (stdout.startsWith("No crontab")) return [];
    return stdout
      .split("\n")
      .map(parseCrontabString)
      .filter((e) => e !== undefined);
  } catch (error) {
    console.error(`error: ${(error as Error).message}`);
    return [];
  }
};

// crons will always just be a pointer to a .sh file, so we dont rly need to process the strings for commands in () or ""
const parseCrontabString = (cronString: string): CronTab | undefined => {
  let cron: string = "";
  let user: string | undefined;
  let command: string = "";

  const cronSplitSpace = cronString.split(" ");
  if (cronSplitSpace.length < 2) return undefined;

  if (cronString.startsWith("@")) {
    cron = cronSplitSpace.shift()!;
    user = cronSplitSpace.length > 1 ? cronSplitSpace.shift() : undefined;
    command = cronSplitSpace.join(" ");
  } else {
    cron = cronSplitSpace.splice(0, 5).join(" ");
    user = cronSplitSpace.length > 1 ? cronSplitSpace.shift() : undefined;
    command = cronSplitSpace.join(" ");
  }

  return {
    command,
    cronString: cron,
    humanReadableCron: cronToHumanReadableString(cron),
  };
};

export const writeCrontabs = async (crontabs: CronTab[]) => {
  //TODO: parse crons before writing

  let command = `echo "${crontabs.map((crontab) => `${crontab.cronString} ${crontab.command}`).join("\n")}" | crontab -`;

  try {
    const { stdout: _stdout } = await execAsync(command);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
