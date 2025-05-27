import Board from "@/components/Board";
import { sortDataMap, SortField, SortOrder } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{
    sortBy?: string
    order?: string
  }>
}

const demoData = {
  "Jake": [
      {
          "id": "Jake0",
          "group": "Jake",
          "title": "Teneo basium consuasor utroque ab ventosus blanditiis summopere.",
          "summary": "Approbo earum coniuratio terga auditor in apud aeger. Dedecor omnis sumo. Omnis versus occaecati.",
          "status": "quisquam",
          "createdAt": "2025-04-23T03:31:53.702Z"
      },
      {
          "id": "Jake1",
          "group": "Jake",
          "title": "Tredecim tabula speciosus strenuus tego alo vobis amplus.",
          "summary": "Terga cibus crux somniculosus. Arceo tertius cerno conculco pectus labore cohibeo clibanus pectus. Crepusculum calco arguo utpote.",
          "status": "appono",
          "createdAt": "2025-04-23T21:46:10.276Z"
      },
      {
          "id": "Jake2",
          "group": "Jake",
          "title": "Crudelis vix cursus stipes cedo campana harum et vetus admiratio.",
          "summary": "Porro brevis pectus suppono demulceo candidus deinde aduro currus. Dolor volaticus stips admoneo. Rerum sol earum.",
          "status": "conicio",
          "createdAt": "2025-03-14T05:45:22.267Z"
      },
      {
          "id": "Jake3",
          "group": "Jake",
          "title": "Labore subiungo thalassinus somniculosus vulgus tergum virgo.",
          "summary": "Comes adduco illum vorax repellat contra. Ver pecco asperiores thymbra defungo adipiscor viscus id. Arceo tego concido defero vigor decimus spargo vestigium astrum decimus.",
          "status": "consequatur",
          "createdAt": "2024-10-14T13:34:32.979Z"
      },
      {
          "id": "Jake4",
          "group": "Jake",
          "title": "Tamquam temptatio concido tempora calco surgo stillicidium demens.",
          "summary": "Carmen angustus fuga perspiciatis inflammatio. Depereo validus creta paens harum amaritudo chirographum aveho statim spero. Communis degusto curtus temptatio tamisium tyrannus calculus tamquam illo absorbeo.",
          "status": "cultura",
          "createdAt": "2024-06-26T06:30:58.588Z"
      }
  ],
  "BMO": [
      {
          "id": "BMO0",
          "group": "BMO",
          "title": "Quo artificiose deorsum comburo conforto neque confero stella.",
          "summary": "Demoror amplexus angustus cicuta. Velut thermae curriculum adfectus velit dolores doloribus tot. Sol viridis cado thorax.",
          "status": "repellat",
          "createdAt": "2024-10-26T23:04:35.226Z"
      },
      {
          "id": "BMO1",
          "group": "BMO",
          "title": "Sunt articulus cernuus atrox.",
          "summary": "Antepono peior color capio beneficium toties tollo earum coruscus. Amiculum clarus dolores libero terror officia compono vapulus verus. Rerum usque vito voluptas suadeo confido at neque derideo.",
          "status": "sumo",
          "createdAt": "2025-01-09T13:28:58.865Z"
      },
      {
          "id": "BMO2",
          "group": "BMO",
          "title": "Ambulo atrocitas allatus tum.",
          "summary": "Vilis supra decet sed patior. Aspernatur casso tui summa atqui. Curso denuo thalassinus.",
          "status": "sol",
          "createdAt": "2024-12-04T13:11:14.621Z"
      },
      {
          "id": "BMO3",
          "group": "BMO",
          "title": "Soleo eaque temporibus triumphus tergo umbra voveo crepusculum.",
          "summary": "Maiores tutis copiose nemo corrupti ascit. Combibo tricesimus curo copiose. Acervus antepono condico urbs.",
          "status": "timor",
          "createdAt": "2024-09-19T11:39:08.087Z"
      },
      {
          "id": "BMO4",
          "group": "BMO",
          "title": "Celo capio solus a vorax videlicet concido aequus.",
          "summary": "Succurro valens id. Amor valeo quos dapifer vallum excepturi ambulo. Ara uberrime patior centum deludo.",
          "status": "usus",
          "createdAt": "2025-03-08T00:28:20.922Z"
      }
  ],
  "Finn": [
      {
          "id": "Finn0",
          "group": "Finn",
          "title": "Delego quos aliquid canto corrupti deprecator solus vulgus.",
          "summary": "Delectus cognomen depulso dedecor corporis acervus annus. Tergiversatio clementia aiunt deduco atavus templum ancilla decipio inflammatio. Summopere culpa soleo suppellex.",
          "status": "delectatio",
          "createdAt": "2024-10-31T04:55:06.229Z"
      },
      {
          "id": "Finn1",
          "group": "Finn",
          "title": "Patruus succurro culpa ars usus modi consequatur.",
          "summary": "Colo decor vilitas vos copia ademptio. Uredo curiositas civis atqui dolore cresco cervus copiose consuasor candidus. Delectus tumultus subvenio defungo vulpes officiis usque quas cena tondeo.",
          "status": "tantillus",
          "createdAt": "2024-09-24T15:28:17.224Z"
      },
      {
          "id": "Finn2",
          "group": "Finn",
          "title": "Sumo conitor ciminatio.",
          "summary": "Arx crur nemo. Dolorum vesco triduana amet apto artificiose absum cruentus super. Clementia vester cetera colligo celer celebrer.",
          "status": "decerno",
          "createdAt": "2024-10-28T00:23:15.479Z"
      },
      {
          "id": "Finn3",
          "group": "Finn",
          "title": "Ager vero quasi omnis amiculum audacia.",
          "summary": "Valde capillus curtus solus cultura angelus adaugeo tolero ver. Audentia totus suspendo collum tamisium usque paens sol adduco. Deludo omnis sol velut.",
          "status": "consectetur",
          "createdAt": "2024-06-04T05:36:08.391Z"
      },
      {
          "id": "Finn4",
          "group": "Finn",
          "title": "Tum ventosus cavus tabula pariatur vulgivagus aegre uterque derideo.",
          "summary": "Provident repudiandae solium quam clementia undique ipsa subiungo crustulum quis. Sumptus anser voco undique cicuta demitto asper sub speciosus compono. Crux officiis theatrum avaritia doloribus.",
          "status": "crustulum",
          "createdAt": "2024-09-20T02:31:17.733Z"
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
