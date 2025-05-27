import { Email, DataMap } from "./types";
import { faker } from "@faker-js/faker"

//create a function
//inputs: total number of emails, array of strings (group names)
//using faker, create the fake id, title, summary, status
//return a object of type DataMap

export const createMockData = (totalEmails: number, groupNames: string[]): DataMap => {
  const data: DataMap = {};

  for (const groupName of groupNames) {
    const emails: Email[] = [];

    for (let i = 0; i < totalEmails; i++) {
      const email: Email = {
        id: groupName.toString() + i.toString(),
        group: groupName,
        title: faker.lorem.sentence(),
        summary: faker.lorem.paragraph(),
        status: faker.lorem.word(),
        createdAt: faker.date.past().toISOString(),
      };
      emails.push(email);
    }
    data[groupName] = emails;
  }

  return data;
};

export const defaultBoardData = createMockData(5, ["Custom Group 1", "My leads", "Testing Group", "Customers", "Active Campaigns"]);