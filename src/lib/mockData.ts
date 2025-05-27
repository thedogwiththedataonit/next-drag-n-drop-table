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
        updatedAt: faker.date.past().toISOString(),
        audience: faker.lorem.word(),
      };
      emails.push(email);
    }
    data[groupName] = emails;
  }

  return data;
};

export const defaultBoardData = createMockData(5, ["Custom Group 1", "My leads", "Testing Group", "Customers", "Active Campaigns"]);


export const demoData = {
  "Custom Group 1": [
      {
          "id": "Custom Group 10",
          "group": "Custom Group 1",
          "title": "Amiculum atrocitas vallum cicuta exercitationem tabgo crux tolero rerum vivo.",
          "summary": "Aiunt molestiae modi. Cimentarius venia vulgo asporto conatus valde clamo. Argentum auxilium acerbitas valens strues theca demoror virga studio.",
          "status": "condico",
          "createdAt": "2024-06-29T19:54:06.452Z",
          "updatedAt": "2024-08-23T23:09:18.255Z",
          "audience": "cimentarius"
      },
      {
          "id": "Custom Group 11",
          "group": "Custom Group 1",
          "title": "Facilis vix utor tempore tricesimus sodalitas animi cupio catena.",
          "summary": "Verbum repudiandae praesentium asper. Cinis terra aduro possimus atqui suppono. Thymbra spectaculum amicitia.",
          "status": "aspicio",
          "createdAt": "2024-06-24T23:31:06.347Z",
          "updatedAt": "2025-01-22T20:32:57.849Z",
          "audience": "vergo"
      },
      {
          "id": "Custom Group 12",
          "group": "Custom Group 1",
          "title": "Bos taedium eius cribro allatus depono nostrum advoco aqua.",
          "summary": "Video absens appono ventus dedecor repellendus atqui cedo constans. Tenus ipsam aggero. Vinum patrocinor culpo calco.",
          "status": "alioqui",
          "createdAt": "2025-03-08T06:32:49.732Z",
          "updatedAt": "2024-07-15T06:40:47.588Z",
          "audience": "creber"
      },
      {
          "id": "Custom Group 13",
          "group": "Custom Group 1",
          "title": "Cohors verbera officiis at aestivus volutabrum venio trucido viscus.",
          "summary": "Comprehendo turbo acquiro patruus utrimque argentum thymbra explicabo fugiat. Aetas defendo quibusdam tremo vae adaugeo. Tumultus delicate turpis minus deleo vitium eligendi.",
          "status": "decens",
          "createdAt": "2024-07-12T15:40:16.507Z",
          "updatedAt": "2024-12-15T03:22:39.568Z",
          "audience": "cedo"
      },
      {
          "id": "Custom Group 14",
          "group": "Custom Group 1",
          "title": "Cubitum tondeo coaegresco crustulum hic conicio.",
          "summary": "Abduco coma theca voluntarius summa sum conservo cilicium. Surculus tollo capillus paens coniuratio. Testimonium certe spoliatio arx colligo territo harum deinde veritas.",
          "status": "itaque",
          "createdAt": "2025-01-27T22:52:37.253Z",
          "updatedAt": "2024-12-07T04:20:26.233Z",
          "audience": "ustulo"
      }
  ],
  "My leads": [
      {
          "id": "My leads0",
          "group": "My leads",
          "title": "Dedecor comparo aufero tamen certe ipsam depopulo constans subvenio deleo.",
          "summary": "Itaque nostrum deficio totidem conqueror. Arcus subvenio subvenio caelestis repellat calcar delicate sol ascisco crastinus. Solutio adaugeo spoliatio.",
          "status": "apparatus",
          "createdAt": "2024-12-07T15:35:37.072Z",
          "updatedAt": "2025-01-02T00:25:54.308Z",
          "audience": "stipes"
      },
      {
          "id": "My leads1",
          "group": "My leads",
          "title": "Vilis ventito adaugeo vaco quasi.",
          "summary": "Aperte clementia uberrime sollicito sub vero defero cohors volva. Carbo adamo considero aestus titulus usus turpis. Uredo centum copiose torqueo tribuo vita varius verbum.",
          "status": "quae",
          "createdAt": "2024-12-30T04:29:07.876Z",
          "updatedAt": "2024-11-09T03:01:04.048Z",
          "audience": "decerno"
      },
      {
          "id": "My leads2",
          "group": "My leads",
          "title": "Statim minima trucido laborum sumptus artificiose defleo crebro suasoria pecto.",
          "summary": "Vester vaco venio caute quidem demo ago volaticus. Aeger amplus vespillo amplexus aestivus hic copia. Aqua talis dignissimos.",
          "status": "vulpes",
          "createdAt": "2024-06-19T03:31:22.981Z",
          "updatedAt": "2024-06-21T13:03:50.889Z",
          "audience": "valde"
      },
      {
          "id": "My leads3",
          "group": "My leads",
          "title": "Cursus vilis vomica quasi hic incidunt.",
          "summary": "Adflicto capitulus clamo adhaero atrocitas turbo. Sollers assumenda appono vallum. Vulgivagus caput vereor caelum accommodo eos.",
          "status": "quasi",
          "createdAt": "2024-10-30T14:39:29.084Z",
          "updatedAt": "2024-12-09T05:54:14.454Z",
          "audience": "aeternus"
      },
      {
          "id": "My leads4",
          "group": "My leads",
          "title": "Cito cimentarius socius earum acidus delibero celer aetas.",
          "summary": "Virgo non officiis derideo careo capto vulgus consuasor inflammatio verbum. Sonitus artificiose tardus accusator. Vapulus cauda unde vobis inflammatio viridis.",
          "status": "nam",
          "createdAt": "2024-06-21T09:54:54.434Z",
          "updatedAt": "2024-12-29T16:03:37.602Z",
          "audience": "commodo"
      }
  ],
  "Testing Group": [
      {
          "id": "Testing Group0",
          "group": "Testing Group",
          "title": "Varius verbum cicuta aestas celebrer similique tamisium agnitio surculus admoneo.",
          "summary": "Nihil validus animus sit viriliter caterva cruentus ad celo spiritus. Tego totus vobis concedo vetus velum qui. Tergeo mollitia amiculum.",
          "status": "patruus",
          "createdAt": "2024-09-20T13:43:58.258Z",
          "updatedAt": "2025-03-18T05:34:13.819Z",
          "audience": "attonbitus"
      },
      {
          "id": "Testing Group1",
          "group": "Testing Group",
          "title": "Voluptatem vomica vaco.",
          "summary": "Censura defetiscor sunt sono vivo. Conforto dolor cubo spero triumphus abstergo utrimque. Vigor voluptate ciminatio.",
          "status": "spiculum",
          "createdAt": "2025-03-07T02:51:07.373Z",
          "updatedAt": "2025-03-21T11:23:29.331Z",
          "audience": "inflammatio"
      },
      {
          "id": "Testing Group2",
          "group": "Testing Group",
          "title": "Aliqua pauper uter nesciunt vilis terror aestivus nostrum.",
          "summary": "Autem tantum aliqua confugo defleo cunabula suscipit. Coniuratio ultra coadunatio. Pecus tamquam velum.",
          "status": "depono",
          "createdAt": "2025-02-09T09:38:54.929Z",
          "updatedAt": "2024-10-22T02:38:32.778Z",
          "audience": "aut"
      },
      {
          "id": "Testing Group3",
          "group": "Testing Group",
          "title": "Cito corpus tepesco deinde utor demulceo.",
          "summary": "Vel approbo pecco sono valens utpote. Deputo cado vomer officia crux atrox tergiversatio approbo id. Nobis venia approbo volaticus curis suggero amitto verus tabula voluptate.",
          "status": "vorago",
          "createdAt": "2024-11-06T14:41:57.021Z",
          "updatedAt": "2024-06-05T06:41:10.602Z",
          "audience": "tabgo"
      },
      {
          "id": "Testing Group4",
          "group": "Testing Group",
          "title": "A aggero cattus expedita teneo crustulum trucido confugo.",
          "summary": "Solum comis volo curatio verto careo derideo. Alienus voluptatum ait xiphias maxime avaritia clam consequuntur. Autus atavus aurum cattus suppono.",
          "status": "sunt",
          "createdAt": "2024-10-15T17:00:50.257Z",
          "updatedAt": "2024-12-05T22:57:25.377Z",
          "audience": "ago"
      }
  ],
  "Customers": [
      {
          "id": "Customers0",
          "group": "Customers",
          "title": "Vomica tenetur arcus dolore suasoria celo terra saepe molestias.",
          "summary": "Fugit certe ulterius aperiam adsum. Calculus non conculco ago suffragium absum synagoga vicinus eaque. Velociter depraedor cedo.",
          "status": "verbum",
          "createdAt": "2024-09-03T10:26:37.781Z",
          "updatedAt": "2024-06-20T21:53:32.039Z",
          "audience": "commemoro"
      },
      {
          "id": "Customers1",
          "group": "Customers",
          "title": "Defetiscor cupiditas delectus delectus carmen amita.",
          "summary": "Audax versus demo suspendo cunctatio. Argumentum conduco ulciscor sumo vita. Illo thesis certe.",
          "status": "bibo",
          "createdAt": "2025-04-13T18:10:17.944Z",
          "updatedAt": "2024-07-07T04:22:30.192Z",
          "audience": "dedecor"
      },
      {
          "id": "Customers2",
          "group": "Customers",
          "title": "Conduco aer fugit.",
          "summary": "Non cupiditas valetudo deinde. Constans summisse conturbo amaritudo alienus sonitus cumque universe. Theatrum adaugeo degenero aut coerceo.",
          "status": "temporibus",
          "createdAt": "2025-04-11T23:16:46.696Z",
          "updatedAt": "2025-01-26T07:31:10.443Z",
          "audience": "adsuesco"
      },
      {
          "id": "Customers3",
          "group": "Customers",
          "title": "Umquam adipisci astrum defluo officia.",
          "summary": "Vulnero beatus vitiosus comprehendo turpis desipio civitas amplus. Creo altus angulus nam vorax trado ullus cometes. Universe accusator articulus approbo ver crepusculum auxilium.",
          "status": "defungo",
          "createdAt": "2024-12-20T03:46:22.727Z",
          "updatedAt": "2024-06-28T00:20:06.536Z",
          "audience": "cenaculum"
      },
      {
          "id": "Customers4",
          "group": "Customers",
          "title": "Avaritia ubi temeritas.",
          "summary": "Degusto subseco angustus. Collum delinquo odio. Decerno adipiscor brevis cibo consequatur.",
          "status": "aspernatur",
          "createdAt": "2025-05-03T10:54:14.440Z",
          "updatedAt": "2025-02-26T18:48:41.304Z",
          "audience": "amet"
      }
  ],
  "Active Campaigns": [
      {
          "id": "Active Campaigns0",
          "group": "Active Campaigns",
          "title": "Sublime vulgivagus repudiandae custodia viscus vinitor beatae tempora.",
          "summary": "Tabernus conor tyrannus depromo creta totidem. Cerno annus usque subiungo fugit incidunt rerum dolore abscido. Umerus vociferor abduco curo dicta pauci ventosus aro avarus calcar.",
          "status": "claustrum",
          "createdAt": "2024-09-02T13:27:40.415Z",
          "updatedAt": "2025-02-19T16:02:12.900Z",
          "audience": "culpo"
      },
      {
          "id": "Active Campaigns1",
          "group": "Active Campaigns",
          "title": "Desipio anser basium incidunt calculus vacuus officiis deleniti saepe.",
          "summary": "Solus desparatus aedificium conduco truculenter villa crur. Ustilo defaeco triumphus necessitatibus. Comptus tardus decor libero curtus tutamen.",
          "status": "subvenio",
          "createdAt": "2024-12-24T01:34:59.228Z",
          "updatedAt": "2024-11-30T01:55:55.775Z",
          "audience": "autem"
      },
      {
          "id": "Active Campaigns2",
          "group": "Active Campaigns",
          "title": "Tenetur animus amitto verumtamen pecco crastinus administratio terminatio certe.",
          "summary": "Deorsum sordeo sortitus defero adsum absconditus cervus. Vulgivagus pauper adiuvo cui traho thymum ducimus doloremque toties articulus. Aggero tabella stabilis.",
          "status": "summisse",
          "createdAt": "2025-04-18T15:09:37.049Z",
          "updatedAt": "2024-09-17T10:16:34.392Z",
          "audience": "toties"
      },
      {
          "id": "Active Campaigns3",
          "group": "Active Campaigns",
          "title": "Tergo tepidus ustulo cras molestias asporto cupio temporibus.",
          "summary": "Tribuo vapulus voluptas. Pax aurum temperantia eligendi adipiscor possimus. Traho decens victus torrens coadunatio adulatio corona sortitus clibanus.",
          "status": "arguo",
          "createdAt": "2024-12-27T00:49:40.951Z",
          "updatedAt": "2024-10-25T21:46:04.475Z",
          "audience": "acer"
      },
      {
          "id": "Active Campaigns4",
          "group": "Active Campaigns",
          "title": "Decor arguo socius benevolentia quidem tabesco ipsam universe adeptio.",
          "summary": "Speculum apud abduco cupiditate. Placeat cohibeo compono doloribus sono suppellex sustineo talio claudeo crux. Atque pel cimentarius.",
          "status": "curiositas",
          "createdAt": "2024-09-30T13:57:02.493Z",
          "updatedAt": "2025-01-04T14:44:30.353Z",
          "audience": "armarium"
      }
  ]
}