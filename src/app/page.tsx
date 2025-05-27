import Board from "@/components/Board";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";
import { defaultBoardData } from "@/lib/mockData";
interface PageProps {
  searchParams: Promise<{
    sortBy?: string
    order?: string
  }>
}

const demoData = {
  "Custom Group 1": [
      {
          "id": "Custom Group 10",
          "group": "Custom Group 1",
          "title": "Voluptate abstergo pecus terga angulus abduco.",
          "summary": "Dedecor arbitro clam amissio. Amicitia cupiditas claudeo officia atavus adsuesco socius demulceo volaticus. Thymum amplus amo viridis.",
          "status": "averto",
          "createdAt": "2024-11-02T05:44:57.876Z"
      },
      {
          "id": "Custom Group 11",
          "group": "Custom Group 1",
          "title": "Coerceo somniculosus solutio.",
          "summary": "Canto textor terga tolero xiphias. Pectus paens terra temeritas absconditus demum ulciscor sodalitas. Timor video canto vulgaris confido reiciendis demoror apto vel constans.",
          "status": "illo",
          "createdAt": "2024-06-14T03:47:56.488Z"
      },
      {
          "id": "Custom Group 12",
          "group": "Custom Group 1",
          "title": "Villa conservo toties vulnero centum umbra.",
          "summary": "Sto vulariter omnis crudelis. Surgo vitiosus arca delectatio. Speculum temporibus amoveo aranea subito teres usitas tredecim adimpleo absorbeo.",
          "status": "ipsa",
          "createdAt": "2025-04-13T03:33:33.717Z"
      },
      {
          "id": "Custom Group 13",
          "group": "Custom Group 1",
          "title": "Vilitas universe textilis reprehenderit deprimo.",
          "summary": "Cernuus quasi cohaero quod curriculum pax creber auxilium aeneus. Ducimus denego crudelis in adficio caput spargo curis confido. Creator verbum communis alveus vir tandem.",
          "status": "victoria",
          "createdAt": "2024-08-27T04:18:37.896Z"
      },
      {
          "id": "Custom Group 14",
          "group": "Custom Group 1",
          "title": "Administratio utor creber vado carbo comptus adsuesco volutabrum adinventitias.",
          "summary": "Occaecati quo canis. Amplus eum eligendi alter bene depulso numquam. Patior quidem deorsum defaeco balbus molestiae error bos vicissitudo.",
          "status": "deserunt",
          "createdAt": "2025-05-02T10:39:48.716Z"
      }
  ],
  "My leads": [
      {
          "id": "My leads0",
          "group": "My leads",
          "title": "Civitas territo virtus velum carbo cibo.",
          "summary": "Beatus creta calco velociter tabella conservo appono conservo ciminatio voluptates. Celer tamisium enim debitis aestus admoneo crebro. Curatio terra vulpes circumvenio tabesco.",
          "status": "sub",
          "createdAt": "2025-01-05T06:18:58.932Z"
      },
      {
          "id": "My leads1",
          "group": "My leads",
          "title": "Canto arguo contra validus attonbitus suscipio theatrum conqueror.",
          "summary": "Vapulus bene aggredior thema ascisco tego tego. Vinculum celebrer occaecati urbanus. Supra tibi abutor tremo.",
          "status": "antiquus",
          "createdAt": "2025-02-28T12:34:47.128Z"
      },
      {
          "id": "My leads2",
          "group": "My leads",
          "title": "Natus comitatus cicuta.",
          "summary": "Arbor cultura audeo terra. Supellex tremo cursim aduro uredo corroboro. Conicio quam calculus illo varietas utrimque acquiro adimpleo alienus.",
          "status": "conservo",
          "createdAt": "2025-02-25T05:56:33.892Z"
      },
      {
          "id": "My leads3",
          "group": "My leads",
          "title": "Umbra audio atqui titulus vitae basium.",
          "summary": "Apparatus adimpleo cicuta succedo curatio vorax pauci. Aqua copia absconditus virgo stella. Suggero dignissimos excepturi vesper amet ut urbanus suggero.",
          "status": "cimentarius",
          "createdAt": "2024-10-04T07:40:09.410Z"
      },
      {
          "id": "My leads4",
          "group": "My leads",
          "title": "Sperno truculenter synagoga caritas peccatus nesciunt cui abutor turbo tolero.",
          "summary": "Auctus vulnero ambitus. Vix vito cattus absorbeo clarus abduco vulgaris itaque antiquus solutio. Colligo tumultus atrocitas vulgus pecco cum conor vita.",
          "status": "antepono",
          "createdAt": "2024-11-29T20:16:55.061Z"
      }
  ],
  "Testing Group": [
      {
          "id": "Testing Group0",
          "group": "Testing Group",
          "title": "Capio crudelis cornu urbs aggredior tenus attonbitus coadunatio.",
          "summary": "Theca pecto trado stultus delego. Coruscus accusamus appello. Argumentum balbus ustilo deprimo ipsa.",
          "status": "expedita",
          "createdAt": "2024-12-31T11:49:45.624Z"
      },
      {
          "id": "Testing Group1",
          "group": "Testing Group",
          "title": "Texo denuncio dens annus aestas.",
          "summary": "Appello damno umerus temptatio bonus damno quo tempora minima. Amplitudo velut coaegresco admiratio tyrannus conturbo. Nihil annus speciosus creo defero defero.",
          "status": "addo",
          "createdAt": "2024-06-04T10:27:10.220Z"
      },
      {
          "id": "Testing Group2",
          "group": "Testing Group",
          "title": "Vitiosus pel vulpes sono somniculosus animi adeo earum cicuta enim.",
          "summary": "Est vere viridis amitto demum sordeo nostrum comes utpote coniuratio. Adsidue tenax texo complectus arma alienus coruscus soleo acidus canonicus. Vix decimus stillicidium tego volup succedo.",
          "status": "summa",
          "createdAt": "2025-04-14T07:44:30.804Z"
      },
      {
          "id": "Testing Group3",
          "group": "Testing Group",
          "title": "Terminatio comprehendo caelestis vinitor vita bardus benevolentia.",
          "summary": "Trans peccatus amoveo architecto vaco. Cicuta ratione conqueror temperantia vinculum triduana defleo sollers aestivus velum. Viscus ratione tutis taceo ambulo turba nostrum numquam et.",
          "status": "tenax",
          "createdAt": "2024-10-02T06:39:01.474Z"
      },
      {
          "id": "Testing Group4",
          "group": "Testing Group",
          "title": "Aer tersus aperio sint vado denique aspernatur caelestis comprehendo.",
          "summary": "Suus absorbeo utor. Denique velum veritas. Claro thymbra ambitus depono.",
          "status": "comminor",
          "createdAt": "2024-06-18T16:37:54.846Z"
      }
  ],
  "Customers": [
      {
          "id": "Customers0",
          "group": "Customers",
          "title": "Adsuesco uterque conservo dignissimos aegrotatio vicinus molestias.",
          "summary": "Dolorum inflammatio mollitia caries defaeco ambulo. Arx at calculus depopulo quasi terror. Strenuus umbra denuncio deficio virgo utpote terra aranea verbera.",
          "status": "culpa",
          "createdAt": "2024-07-22T20:20:28.021Z"
      },
      {
          "id": "Customers1",
          "group": "Customers",
          "title": "Demoror cura sustineo alveus consequuntur desidero valetudo cultellus.",
          "summary": "Catena denuncio strues succedo trepide sollers patruus cotidie aliquid. Aeternus patria ait. Crebro odit vel vinitor adeptio tergum nulla error.",
          "status": "currus",
          "createdAt": "2025-04-05T00:26:41.772Z"
      },
      {
          "id": "Customers2",
          "group": "Customers",
          "title": "Atqui conqueror magnam adsuesco.",
          "summary": "Urbanus votum cogo surgo nulla. Terminatio summa amaritudo deserunt supplanto aestas tabgo numquam aliqua acerbitas. Deripio peccatus nemo.",
          "status": "explicabo",
          "createdAt": "2024-11-05T00:19:35.343Z"
      },
      {
          "id": "Customers3",
          "group": "Customers",
          "title": "Subiungo cuppedia aeternus subnecto tenus tredecim dolorem nisi sonitus.",
          "summary": "Ter aegre valens aliquam vestigium. Auditor collum utor. Thesis spiculum conspergo defleo tutamen curatio defluo absque succedo decet.",
          "status": "deludo",
          "createdAt": "2025-04-19T19:25:53.567Z"
      },
      {
          "id": "Customers4",
          "group": "Customers",
          "title": "Basium odit culpa vestrum ceno curiositas.",
          "summary": "Averto anser repudiandae cogo volutabrum officia. Eveniet cito dolorum contabesco somnus corrupti ciminatio. Appello umerus amitto turba artificiose.",
          "status": "aveho",
          "createdAt": "2025-03-27T22:32:58.402Z"
      }
  ],
  "Active Campaigns": [
      {
          "id": "Active Campaigns0",
          "group": "Active Campaigns",
          "title": "Deficio ea adsum condico facilis depono volva degenero decumbo eius.",
          "summary": "Sto ratione libero calculus cresco debitis bardus urbanus delectus caveo. Ventus labore tutis vivo aperte ullus accedo. Deprecator cubicularis agnosco vulnus crepusculum maiores claustrum amiculum asporto copia.",
          "status": "adstringo",
          "createdAt": "2024-07-29T07:55:17.162Z"
      },
      {
          "id": "Active Campaigns1",
          "group": "Active Campaigns",
          "title": "Accommodo vos copiose tumultus aequitas iste solvo veniam verecundia.",
          "summary": "Damno consectetur credo alii coaegresco conventus porro vaco desino vallum. Vesco amplus velut rem sortitus tener celer. Utique vespillo vulariter adduco solutio adnuo quasi angulus.",
          "status": "trepide",
          "createdAt": "2024-08-29T23:29:09.190Z"
      },
      {
          "id": "Active Campaigns2",
          "group": "Active Campaigns",
          "title": "Baiulus autem ulterius.",
          "summary": "Tres causa mollitia bonus bibo super quae tenetur balbus. Atrocitas cunae spectaculum repellendus tot. Exercitationem suppono soleo turpis cribro ter tabesco vis.",
          "status": "calcar",
          "createdAt": "2024-09-21T17:09:18.938Z"
      },
      {
          "id": "Active Campaigns3",
          "group": "Active Campaigns",
          "title": "Talus ocer natus aggero aliquid damno consectetur.",
          "summary": "Certus tribuo tabgo nam at commemoro creo ducimus timidus reprehenderit. Collum strenuus suffoco cura vinitor aliqua ustilo. Ea strues vilicus repudiandae vaco cilicium dens trado arbor ad.",
          "status": "caste",
          "createdAt": "2024-06-26T16:33:17.877Z"
      },
      {
          "id": "Active Campaigns4",
          "group": "Active Campaigns",
          "title": "Aetas ars hic absorbeo.",
          "summary": "Desolo terreo natus toties abstergo adimpleo. Natus vel accusator peccatus aestas voluptas sunt deinde vespillo. Sopor desparatus veritatis inflammatio comprehendo.",
          "status": "coniecto",
          "createdAt": "2025-03-30T14:24:19.378Z"
      }
  ]
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const sortField = (params.sortBy as SortField) || "createdAt"
  const sortOrder = (params.order as SortOrder) || "desc"

  // Sort the data server-side on initial load
  const sortedData = sortDataMap(demoData, sortField, sortOrder)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                React Beautiful DnD Board
              </h1>
              <p className="mt-2 text-slate-600">
                Drag and drop quotes between columns and reorder columns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <Board 
        initial={sortedData} 
        withScrollableColumns 
        initialSortField={sortField}
        initialSortOrder={sortOrder}
      />
    </div>
  );
}
