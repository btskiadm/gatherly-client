import { Category, City, Group, User } from "./mock-db.types";
import { GroupLogo4x3, ProfileLogo4x3 } from "./mock-img";

const loremIpsum =
  `Cupidatat officia dolor irure nulla labore cupidatat tempor incididunt nulla adipisicing aute. Et eu proident nulla irure deserunt quis proident minim. Ipsum eu do labore quis tempor ipsum ipsum mollit. Irure velit ipsum fugiat irure veniam in dolor dolor ullamco consequat quis est. Aliquip non duis laboris consequat ad quis excepteur ad sunt labore est.
Dolor reprehenderit eu ex pariatur ex laborum. Culpa aliquip cillum nulla reprehenderit eiusmod esse incididunt tempor. Amet veniam amet laborum exercitation eiusmod officia in excepteur cillum tempor.
Ullamco nulla esse esse anim duis labore consequat incididunt eu aliqua mollit laboris esse deserunt. Exercitation nulla nulla aliqua Lorem. Culpa aliqua qui incididunt exercitation eiusmod elit voluptate in occaecat nulla excepteur commodo mollit.
Anim eiusmod minim minim id dolor amet cupidatat velit tempor dolor officia sit irure. Eu mollit sint minim pariatur sunt consectetur est cupidatat cupidatat magna et. Id voluptate consectetur eiusmod ullamco irure aliqua eiusmod et do magna ad laboris.
Nisi in sunt amet irure aute id dolore cillum non ullamco sit anim. Officia minim sint id esse enim magna do enim amet incididunt. Anim qui voluptate reprehenderit aute irure mollit aliquip do cillum fugiat et voluptate anim. Reprehenderit ipsum ea nisi deserunt reprehenderit cillum aute tempor qui. Do cupidatat amet tempor ut.
Ex nulla cillum Lorem quis exercitation elit esse sint tempor cillum velit ea. Aliquip magna elit aliquip eu cupidatat eiusmod. Fugiat voluptate cillum et cillum in nostrud aliqua enim eiusmod sit. Adipisicing magna mollit sunt voluptate. Excepteur non laborum ad consequat incididunt incididunt proident ea elit in ad culpa sint. Est cillum in duis consequat esse dolore ad ex sunt pariatur tempor velit ut consequat.
Sint quis ex eiusmod cillum eu adipisicing. Eu ut consequat cupidatat tempor elit cupidatat ullamco sint laborum. Velit occaecat ad esse officia. Ipsum commodo esse ullamco exercitation.
Veniam in ad nostrud Lorem nisi est consequat excepteur. Consectetur exercitation pariatur eiusmod consectetur. Non qui sint voluptate consectetur pariatur id ut qui reprehenderit sint officia aliquip sunt.
Ad quis aute magna excepteur et deserunt eiusmod mollit. Nulla ex do culpa commodo qui irure occaecat eiusmod adipisicing aliquip aliquip sunt cupidatat. In Lorem quis laboris minim nostrud reprehenderit enim. Culpa dolor tempor aliquip sit pariatur eu tempor fugiat culpa consequat. Consectetur reprehenderit proident ex sint.
Ad reprehenderit elit consectetur id incididunt veniam dolore culpa aute mollit minim. Deserunt commodo do culpa duis id dolore incididunt sint. Labore magna cupidatat occaecat anim sit amet labore adipisicing do enim ut. Est sunt esse tempor laborum Lorem do amet eiusmod adipisicing aute Lorem aute fugiat. Tempor deserunt proident mollit proident est laboris nulla mollit excepteur nostrud. Dolore culpa eiusmod deserunt enim.`.repeat(
    6
  );

const getLoremIpsumSentenses = (s: number, startAt: number = 0) => {
  let sentences = loremIpsum.split(".");

  return sentences
    .slice(startAt, startAt + s)
    .join(". ")
    .trim();
};

export const DBCategory: Category[] = [
  { value: "football", label: "Piłka nożna" },
  { value: "chess", label: "Szachy" },
  { value: "walking", label: "Spacer" },
  { value: "gym", label: "Siłownia" },
  { value: "running", label: "Bieganie" },
  { value: "swimming", label: "Pływanie" },
  { value: "cycling", label: "Jazda na rowerze" },
  { value: "hiking", label: "Wędrówki" },
  { value: "yoga", label: "Joga" },
  { value: "dancing", label: "Taniec" },
  { value: "basketball", label: "Koszykówka" },
  { value: "tennis", label: "Tenis" },
  { value: "skiing", label: "Narciarstwo" },
  { value: "climbing", label: "Wspinaczka" },
  { value: "kayaking", label: "Kajakarstwo" },
  { value: "badminton", label: "Badminton" },
  { value: "table_tennis", label: "Tenis stołowy" },
  { value: "golf", label: "Golf" },
  { value: "horse_riding", label: "Jazda konna" },
  { value: "skating", label: "Łyżwiarstwo" },
  { value: "surfing", label: "Surfing" },
  { value: "fishing", label: "Wędkarstwo" },
  { value: "volleyball", label: "Siatkówka" },
  { value: "handball", label: "Piłka ręczna" },
  { value: "archery", label: "Łucznictwo" },
  { value: "boxing", label: "Boks" },
  { value: "fencing", label: "Szermierka" },
  { value: "triathlon", label: "Triathlon" },
  { value: "snowboarding", label: "Snowboarding" },
  { value: "crossfit", label: "Crossfit" },
  { value: "pilates", label: "Pilates" },
  { value: "rowing", label: "Wioślarstwo" },
  { value: "rock_climbing", label: "Wspinaczka skalna" },
  { value: "skateboarding", label: "Jazda na deskorolce" },
  { value: "kickboxing", label: "Kickboxing" },
  { value: "judo", label: "Judo" },
  { value: "karate", label: "Karate" },
  { value: "taekwondo", label: "Taekwondo" },
  { value: "mma", label: "MMA" },
  { value: "cricket", label: "Krykiet" },
  { value: "baseball", label: "Baseball" },
  { value: "softball", label: "Softball" },
  { value: "sailing", label: "Żeglarstwo" },
  { value: "scuba_diving", label: "Nurkowanie" },
  { value: "paragliding", label: "Paralotniarstwo" },
  { value: "skydiving", label: "Skoki spadochronowe" },
  { value: "bungee_jumping", label: "Skoki na bungee" },
  { value: "parkour", label: "Parkour" },
  { value: "mountaineering", label: "Alpinizm" },
  { value: "snorkeling", label: "Snurkowanie" },
  { value: "canoeing", label: "Kajakarstwo górskie" },
  { value: "darts", label: "Rzutki" },
  { value: "bowling", label: "Kręgle" },
  { value: "equestrian", label: "Sporty jeździeckie" },
  { value: "ice_hockey", label: "Hokej na lodzie" },
  { value: "figure_skating", label: "Łyżwiarstwo figurowe" },
  { value: "rugby", label: "Rugby" },
  { value: "american_football", label: "Futbol amerykański" },
  { value: "paddleboarding", label: "Stand-up paddleboarding" },
  { value: "windsurfing", label: "Windsurfing" },
  { value: "kitesurfing", label: "Kitesurfing" },
  { value: "trampoline", label: "Skakanie na trampolinie" },
  { value: "orienteering", label: "Biegi na orientację" },
  { value: "biathlon", label: "Biathlon" },
  { value: "powerlifting", label: "Trójbój siłowy" },
  { value: "bodybuilding", label: "Kulturystyka" },
  { value: "capoeira", label: "Capoeira" },
  { value: "kung_fu", label: "Kung Fu" },
  { value: "sambo", label: "Sambo" },
  { value: "sumo", label: "Sumo" },
  { value: "motocross", label: "Motocross" },
  { value: "kart_racing", label: "Karting" },
  { value: "futsal", label: "Futsal" },
  { value: "lacrosse", label: "Lacrosse" },
  { value: "polo", label: "Polo" },
  { value: "dragon_boat_racing", label: "Wyścigi łodzi smoczych" },
  { value: "curling", label: "Curling" },
  { value: "bobsleigh", label: "Bobsleje" },
  { value: "skeleton", label: "Skeleton" },
  { value: "luge", label: "Saneczkarstwo" },
  { value: "speed_skating", label: "Łyżwiarstwo szybkie" },
  { value: "sled_dog_racing", label: "Wyścigi psich zaprzęgów" },
  { value: "freestyle_skiing", label: "Narciarstwo dowolne" },
  { value: "snowshoeing", label: "Rakiety śnieżne" },
  { value: "paintball", label: "Paintball" },
  { value: "airsoft", label: "Airsoft" },
  { value: "disc_golf", label: "Disc Golf" },
  { value: "ultimate_frisbee", label: "Ultimate Frisbee" },
  { value: "water_polo", label: "Piłka wodna" },
  { value: "synchronized_swimming", label: "Pływanie synchroniczne" },
  { value: "cliff_diving", label: "Skoki do wody z klifu" },
  { value: "high_jump", label: "Skok wzwyż" },
  { value: "long_jump", label: "Skok w dal" },
  { value: "triple_jump", label: "Trójskok" },
  { value: "pole_vault", label: "Skok o tyczce" },
  { value: "hammer_throw", label: "Rzut młotem" },
  { value: "discus_throw", label: "Rzut dyskiem" },
  { value: "javelin_throw", label: "Rzut oszczepem" },
  { value: "shot_put", label: "Pchnięcie kulą" },
  { value: "pentathlon", label: "Pięciobój" },
  { value: "decathlon", label: "Dziesięciobój" },
  { value: "e_sports", label: "E-sport" },
  { value: "speedcubing", label: "Speedcubing" },
  { value: "strongman", label: "Strongman" },
  { value: "cheerleading", label: "Cheerleading" },
  { value: "kite_flying", label: "Latanie latawcem" },
  { value: "bocce", label: "Bule (Bocce)" },
  { value: "pétanque", label: "Pétanque" },
  { value: "croquet", label: "Krokiet" },
  { value: "shuffleboard", label: "Shuffleboard" },
  { value: "tug_of_war", label: "Przeciąganie liny" },
  { value: "tetherball", label: "Tetherball" },
  { value: "quiddich", label: "Quidditch" },
  { value: "robot_wars", label: "Wojny robotów" },
  { value: "drone_racing", label: "Wyścigi dronów" },
  { value: "rock_paper_scissors", label: "Kamień, papier, nożyce" },
  { value: "arm_wrestling", label: "Siłowanie na rękę" },
  { value: "cornhole", label: "Cornhole" },
  { value: "dodgeball", label: "Dwa ognie" },
  { value: "kickball", label: "Kickball" },
  { value: "gaelic_football", label: "Futbol gaelicki" },
  { value: "hurling", label: "Hurling" },
  { value: "paddle_tennis", label: "Paddle Tennis" },
  { value: "pickleball", label: "Pickleball" },
  { value: "street_hockey", label: "Hokej uliczny" },
  { value: "floorball", label: "Unihokej" },
  { value: "sepaktakraw", label: "Sepak Takraw" },
  { value: "kabaddi", label: "Kabaddi" },
  { value: "underwater_rugby", label: "Podwodne rugby" },
  { value: "underwater_hockey", label: "Podwodny hokej" },
  { value: "footvolley", label: "Footvolley" },
  { value: "bossaball", label: "Bossaball" },
  { value: "teqball", label: "Teqball" },
  { value: "slacklining", label: "Slacklining" },
  { value: "kite_surfing", label: "Kite Surfing" },
  { value: "zorbing", label: "Zorbing" },
  { value: "snowkiting", label: "Snowkiting" },
  { value: "speed_skiing", label: "Narciarstwo szybkie" },
  { value: "sandboarding", label: "Sandboarding" },
  { value: "ice_climbing", label: "Wspinaczka lodowa" },
  { value: "gliding", label: "Szybownictwo" },
  { value: "parachuting", label: "Spadochroniarstwo" },
  { value: "base_jumping", label: "BASE jumping" },
  { value: "wingsuit_flying", label: "Latanie w wingsuit" },
  { value: "park_golf", label: "Park Golf" },
  { value: "footgolf", label: "Footgolf" },
  { value: "swamp_football", label: "Błotna piłka nożna" },
  { value: "roller_derby", label: "Roller Derby" },
  { value: "underwater_basket_weaving", label: "Podwodne plecenie koszy" },
  { value: "soapbox_racing", label: "Wyścigi mydelniczek" },
  { value: "chessboxing", label: "Chessboxing" },
  { value: "gaga_ball", label: "Gaga Ball" },
  { value: "spikeball", label: "Spikeball" },
  { value: "freediving", label: "Freediving" },
  { value: "bog_snorkeling", label: "Nurkowanie w bagnie" },
  { value: "log_rolling", label: "Toczenie kłody" },
  { value: "roller_skiing", label: "Narciarstwo na rolkach" },
  { value: "handcycle_racing", label: "Wyścigi rowerów ręcznych" },
  { value: "canoe_polo", label: "Kajak polo" },
  { value: "slalom_skiing", label: "Narciarski slalom" },
  { value: "tower_running", label: "Bieganie po schodach" },
  { value: "stair_climbing", label: "Wspinaczka po schodach" },
  { value: "swimming_with_dolphins", label: "Pływanie z delfinami" },
  { value: "virtual_reality_sports", label: "Sporty wirtualnej rzeczywistości" },
  { value: "bouldering", label: "Buldering" },
  { value: "outrigger_canoeing", label: "Outrigger Canoeing" },
  { value: "canoe_sprinting", label: "Kajakarstwo sprinterskie" },
  { value: "flatwater_kayaking", label: "Kajakarstwo na płaskich wodach" },
];

export const DBCity: City[] = [
  { value: "warsaw", label: "Warszawa" },
  { value: "krakow", label: "Kraków" },
  { value: "gdansk", label: "Gdańsk" },
  { value: "wroclaw", label: "Wrocław" },
  { value: "poznan", label: "Poznań" },
  { value: "lodz", label: "Łódź" },
  { value: "szczecin", label: "Szczecin" },
  { value: "lublin", label: "Lublin" },
  { value: "bydgoszcz", label: "Bydgoszcz" },
  { value: "katowice", label: "Katowice" },
  { value: "bialystok", label: "Białystok" },
  { value: "czestochowa", label: "Częstochowa" },
  { value: "radom", label: "Radom" },
  { value: "torun", label: "Toruń" },
  { value: "kielce", label: "Kielce" },
  { value: "gliwice", label: "Gliwice" },
  { value: "zabrze", label: "Zabrze" },
  { value: "olsztyn", label: "Olsztyn" },
  { value: "rzeszow", label: "Rzeszów" },
  { value: "zielona_gora", label: "Zielona Góra" },
  { value: "opole", label: "Opole" },
  { value: "gorzow_wielkopolski", label: "Gorzów Wielkopolski" },
  { value: "plock", label: "Płock" },
  { value: "bielsko_biala", label: "Bielsko-Biała" },
  { value: "walbrzych", label: "Wałbrzych" },
  { value: "legnica", label: "Legnica" },
  { value: "elblag", label: "Elbląg" },
  { value: "tarnow", label: "Tarnów" },
  { value: "chorzow", label: "Chorzów" },
  { value: "kalisz", label: "Kalisz" },
  { value: "gdynia", label: "Gdynia" },
  { value: "sosnowiec", label: "Sosnowiec" },
  { value: "ruda_slaska", label: "Ruda Śląska" },
  { value: "tychy", label: "Tychy" },
  { value: "dabrowa_gornicza", label: "Dąbrowa Górnicza" },
  { value: "pila", label: "Piła" },
  { value: "ostrow_wielkopolski", label: "Ostrów Wielkopolski" },
  { value: "konin", label: "Konin" },
  { value: "pabianice", label: "Pabianice" },
  { value: "suwalki", label: "Suwałki" },
  { value: "grudziadz", label: "Grudziądz" },
  { value: "wloclawek", label: "Włocławek" },
  { value: "lomza", label: "Łomża" },
  { value: "glogow", label: "Głogów" },
  { value: "zamosc", label: "Zamość" },
  { value: "jastrzebie_zdroj", label: "Jastrzębie-Zdrój" },
  { value: "mielec", label: "Mielec" },
  { value: "swidnica", label: "Świdnica" },
  { value: "stargard", label: "Stargard" },
  { value: "belchatow", label: "Bełchatów" },
  { value: "ciechanow", label: "Ciechanów" },
  { value: "krosno", label: "Krosno" },
  { value: "tczew", label: "Tczew" },
  { value: "malbork", label: "Malbork" },
  { value: "kwidzyn", label: "Kwidzyn" },
  { value: "nowy_sacz", label: "Nowy Sącz" },
  { value: "oswiecim", label: "Oświęcim" },
  { value: "przemysl", label: "Przemyśl" },
  { value: "zakopane", label: "Zakopane" },
  { value: "ostroleka", label: "Ostrołęka" },
];

export const DBUser: User[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    username: "seoquesto",
    staticImageData: ProfileLogo4x3[0],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[0].src },
    userDetails: {
      description: getLoremIpsumSentenses(4, 1),
      city: DBCity[0],
    },
  },
  {
    id: "f27c9d4b-8c91-489f-a72a-ec1923f3f0b5",
    username: "techwizard",
    staticImageData: ProfileLogo4x3[0],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[0].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 2),
      city: DBCity[0],
    },
  },
  {
    id: "b4f4bc78-e1c5-44b3-b4af-021aa9ed64b5",
    username: "marketingguru",
    staticImageData: ProfileLogo4x3[1],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[1].src },
    userDetails: {
      description: getLoremIpsumSentenses(4, 3),
      city: DBCity[0],
    },
  },
  {
    id: "c2b66e0e-663b-4e8d-a6e4-1845c4fbdf0f",
    username: "designmaster",
    staticImageData: ProfileLogo4x3[2],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[2].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 4),
      city: DBCity[1],
    },
  },
  {
    id: "a57b5fd3-3b27-4f11-bf3d-839e4b79231b",
    username: "codemaverick",
    staticImageData: ProfileLogo4x3[3],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[3].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 5),
      city: DBCity[1],
    },
  },
  {
    id: "7ad9b292-1d2e-4fc2-8175-0c31d965d3c2",
    username: "analyticspro",
    staticImageData: ProfileLogo4x3[4],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[4].src },
    userDetails: {
      description: getLoremIpsumSentenses(4, 7),
      city: DBCity[1],
    },
  },
  {
    id: "d91ff2cd-f89b-44b6-b33d-5741c4f12514",
    username: "webcreator",
    staticImageData: ProfileLogo4x3[5],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[5].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 2),
      city: DBCity[2],
    },
  },
  {
    id: "42f6d06f-6b34-4b99-b676-215c97f681b8",
    username: "growthhacker",
    staticImageData: ProfileLogo4x3[6],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[6].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 4),
      city: DBCity[2],
    },
  },
  {
    id: "2a5c8f18-3ff4-4b0b-93b6-48b0ef17e7c1",
    username: "conversionking",
    staticImageData: ProfileLogo4x3[7],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[7].src },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 6),
      city: DBCity[2],
    },
  },
  {
    id: "e5b8db69-9c48-4b21-9182-61a282f72e3e",
    username: "contentninja",
    staticImageData: ProfileLogo4x3[8],
    thumbnails: { id: "thumbnails", thumb: ProfileLogo4x3[8].src },
    userDetails: {
      description: getLoremIpsumSentenses(4, 1),
      city: DBCity[2],
    },
  },
  {
    id: "cd88d305-daff-4a72-a7f2-7585279beed8",
    username: "trafficgenius",
    staticImageData: ProfileLogo4x3[9],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[9].src,
    },
    userDetails: {
      description: getLoremIpsumSentenses(4, 11),
      city: DBCity[3],
    },
  },
  {
    id: "85e073df-5de7-409f-a1b3-0b6ad4b98790",
    username: "brandbuilder",
    staticImageData: ProfileLogo4x3[10],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[10].src,
    },
    verifiedAt: new Date("2020-10-10").toISOString(),
    userDetails: {
      description: getLoremIpsumSentenses(4, 14),
      city: DBCity[3],
    },
  },
  {
    id: "94d93bfb-b671-4a55-81c4-5d89d5fd632f",
    username: "leadstrategist",
    staticImageData: ProfileLogo4x3[11],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[11].src,
    },
    userDetails: {
      description: getLoremIpsumSentenses(4, 16),
      city: DBCity[3],
    },
  },
  {
    id: "a9b5f4da-97e1-4d85-b32e-0ec2aaf5b86e",
    username: "devopschamp",
    staticImageData: ProfileLogo4x3[12],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[12].src,
    },
    userDetails: {
      description: getLoremIpsumSentenses(4, 6),
      city: DBCity[3],
    },
  },
  {
    id: "e3cb6e7d-10b1-4c5b-92ea-e18421c9c93b",
    username: "frontenddev",
    staticImageData: ProfileLogo4x3[13],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[13].src,
    },
    userDetails: {
      description: getLoremIpsumSentenses(4, 5),
      city: DBCity[4],
    },
  },
  {
    id: "ff48e1df-4bde-4563-b5b4-65fd0d8c909b",
    username: "adexperto",
    staticImageData: ProfileLogo4x3[14],
    thumbnails: {
      id: "thumbnails",
      thumb: ProfileLogo4x3[14].src,
    },
    userDetails: {
      description: getLoremIpsumSentenses(4, 3),
      city: DBCity[4],
    },
  },
];

export const DBGroups: Group[] = [];

const numbOfGroups = 100;
const maxEventsPerGroup = 10;
const maxUserPerGroup = 10;
const maxCategoriesPerGroup = 5;
const maxCitiesPerGroup = 1;
const maxCommentsPerGroup = 20;

const iterate = (num: number, func: (index: number) => void) => {
  for (let i = 0; i < num; i++) {
    func(i);
  }
};

iterate(numbOfGroups, (groupIndex) => {
  const arrayable = (num: number) => Array(num).fill("");

  const totalLogos = GroupLogo4x3.length;
  const totalUsers = DBUser.length;
  const totalCities = DBCity.length;
  const totalCategories = DBCategory.length;

  const groupLogoIndex = Math.floor(groupIndex * 1.51) % totalLogos || 1;
  const totalUsersCount = Math.floor(groupIndex * 1.33) % maxUserPerGroup || 1;
  const totalCitiesCount = Math.floor(groupIndex * 1.77) % maxCitiesPerGroup || 1;
  const totalCategoriesCount = Math.floor(groupIndex * 1.77) % maxCategoriesPerGroup || 1;
  const totalEventsCount = Math.floor(groupIndex * 1.91) % maxEventsPerGroup;
  const totalCommentsCount = Math.floor(groupIndex & 2.01) % maxCommentsPerGroup;

  const groupId = `group-${groupIndex}`;

  const groupCreatedAt = new Date();
  groupCreatedAt.setDate(groupCreatedAt.getDate() - groupIndex * 7);

  DBGroups.push({
    id: groupId,
    title: getLoremIpsumSentenses(1, groupIndex),
    description: getLoremIpsumSentenses(8, groupIndex + 1),
    createdAt: groupCreatedAt.toISOString(),
    thumbnails: {
      id: `${groupId}_thumbnailds`,
      thumb: GroupLogo4x3[groupLogoIndex].src,
    },
    cities: arrayable(totalCitiesCount).map((_, idx) => {
      const cityIndex = (groupIndex + idx) % totalCities;
      const city = DBCity[cityIndex];

      return {
        label: city.label,
        value: city.value,
      };
    }),
    categories: arrayable(totalCategoriesCount).map((_, idx) => {
      const categoryIndex = (groupIndex + idx) % totalCategories;
      const category = DBCategory[categoryIndex];

      return {
        label: category.label,
        value: category.value,
      };
    }),
    sponsored: {
      id: `${groupId}_sponsored`,
      value: groupIndex % 2 === 0,
    },
    verified: {
      id: `${groupId}_verified`,
      value: groupIndex % 3 === 0,
    },
    remote: {
      id: `${groupId}_remote`,
      value: groupIndex % 5 === 0,
    },
    events: arrayable(totalEventsCount).map((_, eventIdx) => {
      const eventId = `${groupId}_event-${eventIdx}`;
      const eventCreatedAt = new Date(groupCreatedAt);
      eventCreatedAt.setDate(eventCreatedAt.getDate() + eventIdx * 3);

      const startAt = new Date(eventCreatedAt);
      const endAt = new Date(eventCreatedAt);

      startAt.setHours(startAt.getHours());
      endAt.setHours(startAt.getHours() + (eventIdx || 1) * 1.1);

      const eventUsersCount = (eventIdx * 3) % totalUsersCount;

      return {
        id: eventId,
        title: getLoremIpsumSentenses(1, groupIndex + eventIdx),
        description: getLoremIpsumSentenses(2, groupIndex + eventIdx + 1),
        createdAt: eventCreatedAt.toISOString(),
        canceled: eventIdx % 2 === 0,
        date: {
          id: `${eventId}_date`,
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
        },
        cities: arrayable(totalCitiesCount).map((_, idx) => {
          const cityIndex = (groupIndex + idx) % totalCities;
          const city = DBCity[cityIndex];

          return {
            label: city.label,
            value: city.value,
          };
        }),
        sponsored: {
          id: `${eventId}_sponsored`,
          value: groupIndex % 2 === 0,
        },
        verified: {
          id: `${eventIdx}_verified`,
          value: groupIndex % 3 === 0,
        },
        remote: {
          id: `${eventIdx}_remote`,
          value: groupIndex % 5 === 0,
        },
        categories: arrayable(totalCategoriesCount).map((_, idx) => {
          const categoryIndex = (groupIndex + idx) % totalCategories;
          const category = DBCategory[categoryIndex];

          return {
            label: category.label,
            value: category.value,
          };
        }),
        users: Array(eventUsersCount)
          .fill("")
          .map((_, userIdx) => {
            const user = DBUser[userIdx];
            return {
              isHost: userIdx === 0,
              isModerator: userIdx === 1 || userIdx === 2,
              user: {
                id: user.id,
                username: user.username,
                staticImageData: user.staticImageData,
                thumbnails: {
                  id: "thumbnails",
                  thumb: user.staticImageData.src,
                },
                userDetails: {
                  description: user.userDetails.description,
                  city: user.userDetails.city,
                },
              },
            };
          }),
      };
    }),
    users: arrayable(totalUsersCount).map((_, userIdx) => {
      const user = DBUser[userIdx % totalUsersCount];

      return {
        isHost: userIdx === 0,
        isModerator: userIdx === 1 || userIdx === 2,
        user: {
          id: user.id,
          username: user.username,
          staticImageData: user.staticImageData,
          thumbnails: { id: "thumbnails", thumb: user.staticImageData.src },
          userDetails: {
            description: user.userDetails.description,
            city: user.userDetails.city,
          },
        },
      };
    }),
    comments: arrayable(totalCommentsCount).map((_, commentIdx) => {
      const createdAt = new Date(groupCreatedAt);
      createdAt.setHours(createdAt.getHours() + commentIdx * 12);

      return {
        id: `${groupId}_comment-${commentIdx}`,
        content: getLoremIpsumSentenses(1, commentIdx),
        createdAt: createdAt.toISOString(),
        rate: commentIdx % 6 || 1,
        user: DBUser[commentIdx % DBUser.length],
      };
    }),
  });
});
