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
        name: faker.company.catchPhrase(),
        subject: faker.lorem.sentence(),
        summary: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement(['Draft', 'Scheduled', 'Sent', 'Published', 'Paused', 'Brew Recommendation']),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
        audience: faker.company.name(),
        type: faker.helpers.arrayElement(['Newsletter', 'Promotional', 'Transactional', 'Announcement', 'Welcome']),
        openRate: faker.number.int({ min: 0, max: 100 }),
        clickRate: faker.number.int({ min: 0, max: 100 }),
        sentDate: faker.date.past().toISOString(),
        sentTime: faker.date.past().toISOString(),
        sent: faker.number.int({ min: 0, max: 100 }),
        isRecommended: faker.datatype.boolean(),
        scheduledFor: faker.date.future().toISOString(),
        visibility: faker.helpers.arrayElement(['public', 'private', 'draft']),
      };
      emails.push(email);
    }
    data[groupName] = emails;
  }

  return data;
};

export const defaultBoardData = createMockData(5, ["Custom Group 1", "My leads", "Testing Group", "Customers", "Active Campaigns"]);
