import { FmdGoodOutlined, InterestsOutlined, TitleRounded } from "@mui/icons-material";
import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import { GroupLogo4x3 } from "../mock/mock-img";

export interface SponsoredTag {
  key: "sponsored";
  value: boolean;
}
export interface RemoteTag {
  key: "remote";
  value: boolean;
}

export interface VerifiedTag {
  key: "verified";
  value: boolean;
}

export interface StationaryTag {
  key: "stationary";
  value: boolean;
}
1;
export interface CitySearch {
  key: "city";
  value: string;
  label: string;
}

export interface NameSearch {
  key: "name";
  value: string;
  label: string;
}

export interface CategorySearch {
  key: "category";
  value: string;
  label: string;
}

export type FilterTag = SponsoredTag | VerifiedTag | StationaryTag | RemoteTag;

export type SearchTag = CitySearch | NameSearch | CategorySearch;

export type FilterTagKeys = FilterTag["key"];

export type SearchTagKeys = SearchTag["key"];

export interface CityTag {
  key: "city";
  value: string;
  label: string;
}

export interface CategoryTag {
  key: "category";
  value: string;
  label: string;
}

export type StackedGroupTag = SponsoredTag | VerifiedTag | RemoteTag | CityTag | CategoryTag;

export interface StackedGroupTiles {
  tags: StackedGroupTag[];
  tiles: GroupTile[];
}

export interface GroupTile {
  id: string;
  title: string;
  members: number;
  createdAt: Date;
  description: string;
  img: string | StaticImageData;
}

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

  return sentences.slice(startAt, startAt + s).join(". ");
};

export const filterTagLabel: Record<FilterTagKeys, string> = {
  remote: "Remote",
  sponsored: "Sponsored",
  stationary: "Stationary",
  verified: "Verified",
};

export const searchLabel: Record<SearchTagKeys, string> = {
  category: "Category",
  name: "Name",
  city: "City",
};

export const searchIcon: Record<SearchTagKeys, ReactNode> = {
  category: <InterestsOutlined />,
  city: <FmdGoodOutlined />,
  name: <TitleRounded />,
};

export const stackedGroupTiles: StackedGroupTiles[] = [
  {
    tags: [
      {
        key: "city",
        label: "Łódź",
        value: "lodz",
      },
      {
        key: "category",
        label: "Koszykówka",
        value: "basketball",
      },
      {
        key: "sponsored",
        value: true,
      },
      {
        key: "verified",
        value: true,
      },
    ],
    tiles: [
      {
        id: "1",
        title: getLoremIpsumSentenses(2, 0),
        description: getLoremIpsumSentenses(2, 2),
        members: 10,
        createdAt: new Date("10.10.2020"),
        img: GroupLogo4x3[0],
      },
      {
        id: "2",
        title: getLoremIpsumSentenses(2, 2),
        description: getLoremIpsumSentenses(2, 4),
        members: 63,
        createdAt: new Date("10.10.2021"),
        img: GroupLogo4x3[1],
      },
      {
        id: "3",
        title: getLoremIpsumSentenses(2, 4),
        description: getLoremIpsumSentenses(2, 6),
        members: 127,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[2],
      },
      {
        id: "4",
        title: getLoremIpsumSentenses(2, 6),
        description: getLoremIpsumSentenses(2, 8),
        members: 1,
        createdAt: new Date("10.10.2023"),
        img: GroupLogo4x3[3],
      },
      {
        id: "5",
        title: getLoremIpsumSentenses(2, 8),
        description: getLoremIpsumSentenses(2, 10),
        members: 3120,
        createdAt: new Date("10.10.2024"),
        img: GroupLogo4x3[4],
      },
      {
        id: "6",
        title: getLoremIpsumSentenses(2, 10),
        description: getLoremIpsumSentenses(2, 12),
        members: 1274,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[5],
      },
      {
        id: "7",
        title: getLoremIpsumSentenses(2, 12),
        description: getLoremIpsumSentenses(2, 14),
        members: 1227,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[6],
      },
      {
        id: "8",
        title: getLoremIpsumSentenses(2, 14),
        description: getLoremIpsumSentenses(2, 16),
        members: 9127,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[7],
      },
      {
        id: "9",
        title: getLoremIpsumSentenses(2, 16),
        description: getLoremIpsumSentenses(2, 18),
        members: 51257,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[8],
      },
      {
        id: "10",
        title: getLoremIpsumSentenses(2, 18),
        description: getLoremIpsumSentenses(2, 20),
        members: 12713,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[9],
      },
      {
        id: "11",
        title: getLoremIpsumSentenses(2, 20),
        description: getLoremIpsumSentenses(2, 22),
        members: 12,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[10],
      },
      {
        id: "12",
        title: getLoremIpsumSentenses(2, 22),
        description: getLoremIpsumSentenses(2, 24),
        members: 527,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[11],
      },
      {
        id: "13",
        title: getLoremIpsumSentenses(2, 24),
        description: getLoremIpsumSentenses(2, 26),
        members: 1827,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[12],
      },
      {
        id: "14",
        title: getLoremIpsumSentenses(2, 26),
        description: getLoremIpsumSentenses(2, 28),
        members: 2127,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[13],
      },
      {
        id: "15",
        title: getLoremIpsumSentenses(2, 30),
        description: getLoremIpsumSentenses(2, 32),
        members: 27,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[14],
      },
      {
        id: "16",
        title: getLoremIpsumSentenses(2, 34),
        description: getLoremIpsumSentenses(2, 36),
        members: 17,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[15],
      },
    ],
  },
  {
    tags: [
      {
        key: "city",
        label: "Kraków",
        value: "cracow",
      },
      {
        key: "category",
        label: "Piłka norzna",
        value: "football",
      },
      {
        key: "sponsored",
        value: false,
      },
      {
        key: "verified",
        value: true,
      },
    ],
    tiles: [
      {
        id: "1",
        title: getLoremIpsumSentenses(6, 4),
        description: getLoremIpsumSentenses(6, 6),
        members: 127,
        createdAt: new Date("10.10.2022"),
        img: GroupLogo4x3[6],
      },
      {
        id: "2",
        title: getLoremIpsumSentenses(8, 6),
        description: getLoremIpsumSentenses(8, 8),
        img: GroupLogo4x3[1],
        members: 1,
        createdAt: new Date("10.10.2023"),
      },
      {
        id: "3",
        title: getLoremIpsumSentenses(10, 8),
        description: getLoremIpsumSentenses(10, 10),
        members: 3120,
        createdAt: new Date("10.10.2024"),
        img: GroupLogo4x3[2],
      },
    ],
  },
  {
    tags: [
      {
        key: "remote",
        value: true,
      },
      {
        key: "category",
        label: "Czytanie",
        value: "read",
      },
      {
        key: "sponsored",
        value: true,
      },
      {
        key: "verified",
        value: false,
      },
    ],
    tiles: [
      {
        id: "1",
        title: getLoremIpsumSentenses(2, 0),
        description: getLoremIpsumSentenses(2, 2),
        members: 10,
        createdAt: new Date("10.10.2020"),
        img: GroupLogo4x3[0],
      },
    ],
  },
];

export const allCategories: CategorySearch[] = [
  { value: "football", label: "Piłka nożna", key: "category" },
  { value: "chess", label: "Szachy", key: "category" },
  { value: "walking", label: "Spacer", key: "category" },
  { value: "gym", label: "Siłownia", key: "category" },
  { value: "running", label: "Bieganie", key: "category" },
  { value: "swimming", label: "Pływanie", key: "category" },
  { value: "cycling", label: "Jazda na rowerze", key: "category" },
  { value: "hiking", label: "Wędrówki", key: "category" },
  { value: "yoga", label: "Joga", key: "category" },
  { value: "dancing", label: "Taniec", key: "category" },
  { value: "basketball", label: "Koszykówka", key: "category" },
  { value: "tennis", label: "Tenis", key: "category" },
  { value: "skiing", label: "Narciarstwo", key: "category" },
  { value: "climbing", label: "Wspinaczka", key: "category" },
  { value: "kayaking", label: "Kajakarstwo", key: "category" },
  { value: "badminton", label: "Badminton", key: "category" },
  { value: "table_tennis", label: "Tenis stołowy", key: "category" },
  { value: "golf", label: "Golf", key: "category" },
  { value: "horse_riding", label: "Jazda konna", key: "category" },
  { value: "skating", label: "Łyżwiarstwo", key: "category" },
  { value: "surfing", label: "Surfing", key: "category" },
  { value: "fishing", label: "Wędkarstwo", key: "category" },
  { value: "volleyball", label: "Siatkówka", key: "category" },
  { value: "handball", label: "Piłka ręczna", key: "category" },
  { value: "archery", label: "Łucznictwo", key: "category" },
  { value: "boxing", label: "Boks", key: "category" },
  { value: "fencing", label: "Szermierka", key: "category" },
  { value: "triathlon", label: "Triathlon", key: "category" },
  { value: "snowboarding", label: "Snowboarding", key: "category" },
  { value: "crossfit", label: "Crossfit", key: "category" },
  { value: "pilates", label: "Pilates", key: "category" },
  { value: "rowing", label: "Wioślarstwo", key: "category" },
  { value: "rock_climbing", label: "Wspinaczka skalna", key: "category" },
  { value: "skateboarding", label: "Jazda na deskorolce", key: "category" },
  { value: "kickboxing", label: "Kickboxing", key: "category" },
  { value: "judo", label: "Judo", key: "category" },
  { value: "karate", label: "Karate", key: "category" },
  { value: "taekwondo", label: "Taekwondo", key: "category" },
  { value: "mma", label: "MMA", key: "category" },
  { value: "cricket", label: "Krykiet", key: "category" },
  { value: "baseball", label: "Baseball", key: "category" },
  { value: "softball", label: "Softball", key: "category" },
  { value: "sailing", label: "Żeglarstwo", key: "category" },
  { value: "scuba_diving", label: "Nurkowanie", key: "category" },
  { value: "paragliding", label: "Paralotniarstwo", key: "category" },
  { value: "skydiving", label: "Skoki spadochronowe", key: "category" },
  { value: "bungee_jumping", label: "Skoki na bungee", key: "category" },
  { value: "parkour", label: "Parkour", key: "category" },
  { value: "mountaineering", label: "Alpinizm", key: "category" },
  { value: "snorkeling", label: "Snurkowanie", key: "category" },
  { value: "canoeing", label: "Kajakarstwo górskie", key: "category" },
  { value: "darts", label: "Rzutki", key: "category" },
  { value: "bowling", label: "Kręgle", key: "category" },
  { value: "equestrian", label: "Sporty jeździeckie", key: "category" },
  { value: "ice_hockey", label: "Hokej na lodzie", key: "category" },
  { value: "figure_skating", label: "Łyżwiarstwo figurowe", key: "category" },
  { value: "rugby", label: "Rugby", key: "category" },
  { value: "american_football", label: "Futbol amerykański", key: "category" },
  { value: "paddleboarding", label: "Stand-up paddleboarding", key: "category" },
  { value: "windsurfing", label: "Windsurfing", key: "category" },
  { value: "kitesurfing", label: "Kitesurfing", key: "category" },
  { value: "trampoline", label: "Skakanie na trampolinie", key: "category" },
  { value: "orienteering", label: "Biegi na orientację", key: "category" },
  { value: "biathlon", label: "Biathlon", key: "category" },
  { value: "powerlifting", label: "Trójbój siłowy", key: "category" },
  { value: "bodybuilding", label: "Kulturystyka", key: "category" },
  { value: "capoeira", label: "Capoeira", key: "category" },
  { value: "kung_fu", label: "Kung Fu", key: "category" },
  { value: "sambo", label: "Sambo", key: "category" },
  { value: "sumo", label: "Sumo", key: "category" },
  { value: "motocross", label: "Motocross", key: "category" },
  { value: "kart_racing", label: "Karting", key: "category" },
  { value: "futsal", label: "Futsal", key: "category" },
  { value: "lacrosse", label: "Lacrosse", key: "category" },
  { value: "polo", label: "Polo", key: "category" },
  { value: "dragon_boat_racing", label: "Wyścigi łodzi smoczych", key: "category" },
  { value: "curling", label: "Curling", key: "category" },
  { value: "bobsleigh", label: "Bobsleje", key: "category" },
  { value: "skeleton", label: "Skeleton", key: "category" },
  { value: "luge", label: "Saneczkarstwo", key: "category" },
  { value: "speed_skating", label: "Łyżwiarstwo szybkie", key: "category" },
  { value: "sled_dog_racing", label: "Wyścigi psich zaprzęgów", key: "category" },
  { value: "freestyle_skiing", label: "Narciarstwo dowolne", key: "category" },
  { value: "snowshoeing", label: "Rakiety śnieżne", key: "category" },
  { value: "paintball", label: "Paintball", key: "category" },
  { value: "airsoft", label: "Airsoft", key: "category" },
  { value: "disc_golf", label: "Disc Golf", key: "category" },
  { value: "ultimate_frisbee", label: "Ultimate Frisbee", key: "category" },
  { value: "water_polo", label: "Piłka wodna", key: "category" },
  { value: "synchronized_swimming", label: "Pływanie synchroniczne", key: "category" },
  { value: "cliff_diving", label: "Skoki do wody z klifu", key: "category" },
  { value: "high_jump", label: "Skok wzwyż", key: "category" },
  { value: "long_jump", label: "Skok w dal", key: "category" },
  { value: "triple_jump", label: "Trójskok", key: "category" },
  { value: "pole_vault", label: "Skok o tyczce", key: "category" },
  { value: "hammer_throw", label: "Rzut młotem", key: "category" },
  { value: "discus_throw", label: "Rzut dyskiem", key: "category" },
  { value: "javelin_throw", label: "Rzut oszczepem", key: "category" },
  { value: "shot_put", label: "Pchnięcie kulą", key: "category" },
  { value: "pentathlon", label: "Pięciobój", key: "category" },
  { value: "decathlon", label: "Dziesięciobój", key: "category" },
  { value: "e_sports", label: "E-sport", key: "category" },
  { value: "speedcubing", label: "Speedcubing", key: "category" },
  { value: "strongman", label: "Strongman", key: "category" },
  { value: "cheerleading", label: "Cheerleading", key: "category" },
  { value: "kite_flying", label: "Latanie latawcem", key: "category" },
  { value: "bocce", label: "Bule (Bocce)", key: "category" },
  { value: "pétanque", label: "Pétanque", key: "category" },
  { value: "croquet", label: "Krokiet", key: "category" },
  { value: "shuffleboard", label: "Shuffleboard", key: "category" },
  { value: "tug_of_war", label: "Przeciąganie liny", key: "category" },
  { value: "tetherball", label: "Tetherball", key: "category" },
  { value: "quiddich", label: "Quidditch", key: "category" },
  { value: "robot_wars", label: "Wojny robotów", key: "category" },
  { value: "drone_racing", label: "Wyścigi dronów", key: "category" },
  { value: "rock_paper_scissors", label: "Kamień, papier, nożyce", key: "category" },
  { value: "arm_wrestling", label: "Siłowanie na rękę", key: "category" },
  { value: "cornhole", label: "Cornhole", key: "category" },
  { value: "dodgeball", label: "Dwa ognie", key: "category" },
  { value: "kickball", label: "Kickball", key: "category" },
  { value: "gaelic_football", label: "Futbol gaelicki", key: "category" },
  { value: "hurling", label: "Hurling", key: "category" },
  { value: "paddle_tennis", label: "Paddle Tennis", key: "category" },
  { value: "pickleball", label: "Pickleball", key: "category" },
  { value: "street_hockey", label: "Hokej uliczny", key: "category" },
  { value: "floorball", label: "Unihokej", key: "category" },
  { value: "sepaktakraw", label: "Sepak Takraw", key: "category" },
  { value: "kabaddi", label: "Kabaddi", key: "category" },
  { value: "underwater_rugby", label: "Podwodne rugby", key: "category" },
  { value: "underwater_hockey", label: "Podwodny hokej", key: "category" },
  { value: "footvolley", label: "Footvolley", key: "category" },
  { value: "bossaball", label: "Bossaball", key: "category" },
  { value: "teqball", label: "Teqball", key: "category" },
  { value: "slacklining", label: "Slacklining", key: "category" },
  { value: "kite_surfing", label: "Kite Surfing", key: "category" },
  { value: "zorbing", label: "Zorbing", key: "category" },
  { value: "snowkiting", label: "Snowkiting", key: "category" },
  { value: "speed_skiing", label: "Narciarstwo szybkie", key: "category" },
  { value: "sandboarding", label: "Sandboarding", key: "category" },
  { value: "ice_climbing", label: "Wspinaczka lodowa", key: "category" },
  { value: "gliding", label: "Szybownictwo", key: "category" },
  { value: "parachuting", label: "Spadochroniarstwo", key: "category" },
  { value: "base_jumping", label: "BASE jumping", key: "category" },
  { value: "wingsuit_flying", label: "Latanie w wingsuit", key: "category" },
  { value: "park_golf", label: "Park Golf", key: "category" },
  { value: "footgolf", label: "Footgolf", key: "category" },
  { value: "swamp_football", label: "Błotna piłka nożna", key: "category" },
  { value: "roller_derby", label: "Roller Derby", key: "category" },
  { value: "underwater_basket_weaving", label: "Podwodne plecenie koszy", key: "category" },
  { value: "soapbox_racing", label: "Wyścigi mydelniczek", key: "category" },
  { value: "chessboxing", label: "Chessboxing", key: "category" },
  { value: "gaga_ball", label: "Gaga Ball", key: "category" },
  { value: "spikeball", label: "Spikeball", key: "category" },
  { value: "freediving", label: "Freediving", key: "category" },
  { value: "bog_snorkeling", label: "Nurkowanie w bagnie", key: "category" },
  { value: "log_rolling", label: "Toczenie kłody", key: "category" },
  { value: "roller_skiing", label: "Narciarstwo na rolkach", key: "category" },
  { value: "handcycle_racing", label: "Wyścigi rowerów ręcznych", key: "category" },
  { value: "canoe_polo", label: "Kajak polo", key: "category" },
  { value: "slalom_skiing", label: "Narciarski slalom", key: "category" },
  { value: "tower_running", label: "Bieganie po schodach", key: "category" },
  { value: "stair_climbing", label: "Wspinaczka po schodach", key: "category" },
  { value: "swimming_with_dolphins", label: "Pływanie z delfinami", key: "category" },
  { value: "virtual_reality_sports", label: "Sporty wirtualnej rzeczywistości", key: "category" },
  { value: "bouldering", label: "Buldering", key: "category" },
  { value: "outrigger_canoeing", label: "Outrigger Canoeing", key: "category" },
  { value: "canoe_sprinting", label: "Kajakarstwo sprinterskie", key: "category" },
  { value: "flatwater_kayaking", label: "Kajakarstwo na płaskich wodach", key: "category" },
];

export const allCities: CitySearch[] = [
  { value: "warsaw", label: "Warszawa", key: "city" },
  { value: "krakow", label: "Kraków", key: "city" },
  { value: "gdansk", label: "Gdańsk", key: "city" },
  { value: "wroclaw", label: "Wrocław", key: "city" },
  { value: "poznan", label: "Poznań", key: "city" },
  { value: "lodz", label: "Łódź", key: "city" },
  { value: "szczecin", label: "Szczecin", key: "city" },
  { value: "lublin", label: "Lublin", key: "city" },
  { value: "bydgoszcz", label: "Bydgoszcz", key: "city" },
  { value: "katowice", label: "Katowice", key: "city" },
  { value: "bialystok", label: "Białystok", key: "city" },
  { value: "czestochowa", label: "Częstochowa", key: "city" },
  { value: "radom", label: "Radom", key: "city" },
  { value: "torun", label: "Toruń", key: "city" },
  { value: "kielce", label: "Kielce", key: "city" },
  { value: "gliwice", label: "Gliwice", key: "city" },
  { value: "zabrze", label: "Zabrze", key: "city" },
  { value: "olsztyn", label: "Olsztyn", key: "city" },
  { value: "rzeszow", label: "Rzeszów", key: "city" },
  { value: "zielona_gora", label: "Zielona Góra", key: "city" },
  { value: "opole", label: "Opole", key: "city" },
  { value: "gorzow_wielkopolski", label: "Gorzów Wielkopolski", key: "city" },
  { value: "plock", label: "Płock", key: "city" },
  { value: "bielsko_biala", label: "Bielsko-Biała", key: "city" },
  { value: "walbrzych", label: "Wałbrzych", key: "city" },
  { value: "legnica", label: "Legnica", key: "city" },
  { value: "elblag", label: "Elbląg", key: "city" },
  { value: "tarnow", label: "Tarnów", key: "city" },
  { value: "chorzow", label: "Chorzów", key: "city" },
  { value: "kalisz", label: "Kalisz", key: "city" },
  { value: "gdynia", label: "Gdynia", key: "city" },
  { value: "sosnowiec", label: "Sosnowiec", key: "city" },
  { value: "ruda_slaska", label: "Ruda Śląska", key: "city" },
  { value: "tychy", label: "Tychy", key: "city" },
  { value: "dabrowa_gornicza", label: "Dąbrowa Górnicza", key: "city" },
  { value: "pila", label: "Piła", key: "city" },
  { value: "ostrow_wielkopolski", label: "Ostrów Wielkopolski", key: "city" },
  { value: "konin", label: "Konin", key: "city" },
  { value: "pabianice", label: "Pabianice", key: "city" },
  { value: "suwalki", label: "Suwałki", key: "city" },
  { value: "grudziadz", label: "Grudziądz", key: "city" },
  { value: "wloclawek", label: "Włocławek", key: "city" },
  { value: "lomza", label: "Łomża", key: "city" },
  { value: "glogow", label: "Głogów", key: "city" },
  { value: "zamosc", label: "Zamość", key: "city" },
  { value: "jastrzebie_zdroj", label: "Jastrzębie-Zdrój", key: "city" },
  { value: "mielec", label: "Mielec", key: "city" },
  { value: "swidnica", label: "Świdnica", key: "city" },
  { value: "stargard", label: "Stargard", key: "city" },
  { value: "belchatow", label: "Bełchatów", key: "city" },
  { value: "ciechanow", label: "Ciechanów", key: "city" },
  { value: "krosno", label: "Krosno", key: "city" },
  { value: "tczew", label: "Tczew", key: "city" },
  { value: "malbork", label: "Malbork", key: "city" },
  { value: "kwidzyn", label: "Kwidzyn", key: "city" },
  { value: "nowy_sacz", label: "Nowy Sącz", key: "city" },
  { value: "oswiecim", label: "Oświęcim", key: "city" },
  { value: "przemysl", label: "Przemyśl", key: "city" },
  { value: "zakopane", label: "Zakopane", key: "city" },
  { value: "ostroleka", label: "Ostrołęka", key: "city" },
];

export const allGroups: SearchTag[] = [
  { label: "Pasjonaci piłki nożnej", key: "name", value: "1a2b3c" },
  { label: "Biegacze Gdynia", key: "name", value: "2d3e4f" },
  { label: "Warszawscy Triathloniści", key: "name", value: "3g4h5i" },
  { label: "Krakowscy Fani Siłowni", key: "name", value: "4j5k6l" },
  { label: "Wrocław Crossfit Team", key: "name", value: "5m6n7o" },
  { label: "Poznań Marathon Runners", key: "name", value: "6p7q8r" },
  { label: "Gdańsk Cycling Club", key: "name", value: "7s8t9u" },
  { label: "BMX Riders Katowice", key: "name", value: "8v9w0x" },
  { label: "Siatkówka Łódź", key: "name", value: "9y0z1a" },
  { label: "Koszykarze Radom", key: "name", value: "0b1c2d" },
  { label: "Bokserski Klub Szczecin", key: "name", value: "1e2f3g" },
  { label: "FF 1.0 Crossfit", key: "name", value: "2h3i4j" },
  { label: "Team Judo Białystok", key: "name", value: "3k4l5m" },
  { label: "Kielce Badminton Pro", key: "name", value: "4n5o6p" },
  { label: "Warsaw Yoga Friends", key: "name", value: "5q6r7s" },
  { label: "Białystok Running Group", key: "name", value: "6t7u8v" },
  { label: "Crossfit Heroes Gdańsk", key: "name", value: "7w8x9y" },
  { label: "Toruń Kajakarze", key: "name", value: "8z0a1b" },
  { label: "Siatkówka Pro Olsztyn", key: "name", value: "9c1d2e" },
  { label: "Lublin Parkour Team", key: "name", value: "0f2g3h" },
  { label: "Rowerzyści Rzeszów", key: "name", value: "1i3j4k" },
  { label: "Warszawski Klub Łuczniczy", key: "name", value: "2l4m5n" },
  { label: "Górska Wędrówka Kraków", key: "name", value: "3o5p6q" },
  { label: "Klub Tenisa Stołowego Łódź", key: "name", value: "4r6s7t" },
  { label: "Sztuki Walki Poznań", key: "name", value: "5u8v9w" },
  { label: "Kajakarze Szczecin", key: "name", value: "6x0y1z" },
  { label: "Piłkarze Plażowi Gdańsk", key: "name", value: "7a2b3c" },
  { label: "Zawodnicy MMA Wrocław", key: "name", value: "8c4d5e" },
  { label: "Siatkówka Plażowa Sopot", key: "name", value: "9e6f7g" },
  { label: "Warsaw Swimming Team", key: "name", value: "0h8i9j" },
  { label: "Golf Club Wrocław", key: "name", value: "1j2k3l" },
  { label: "Warszawa Ultimate Frisbee", key: "name", value: "2m4n5o" },
  { label: "Miłośnicy Biegania Opole", key: "name", value: "3p6q7r" },
  { label: "Beskidzkie Wędrówki Bielsko-Biała", key: "name", value: "4s8t9u" },
  { label: "Żeglarze Trójmiasto", key: "name", value: "5u0v1w" },
  { label: "Lublin Fit Squad", key: "name", value: "6x2y3z" },
  { label: "Fani Motocrossu Rzeszów", key: "name", value: "7a4b5c" },
  { label: "Biegacze z Zakopanego", key: "name", value: "8c6d7e" },
  { label: "Piłka Ręczna Tychy", key: "name", value: "9e8f9g" },
  { label: "Klub Szachowy Katowice", key: "name", value: "0h0i1j" },
  { label: "Łyżwiarze Białystok", key: "name", value: "1k2l3m" },
  { label: "Piłkarze Nożni Gdynia", key: "name", value: "2n4o5p" },
  { label: "Mistrzowie Karate Zabrze", key: "name", value: "3p6q7r" },
  { label: "Biegacze Ultramaratonu Gorzów", key: "name", value: "4s8t9u" },
  { label: "Koszykówka Pro Toruń", key: "name", value: "5u0v1w" },
  { label: "Pasjonaci Tenisa Ziemnego Lublin", key: "name", value: "6x2y3z" },
  { label: "Grupa Wspinaczkowa Tychy", key: "name", value: "7a4b5c" },
  { label: "Sporty Zimowe Zakopane", key: "name", value: "8c6d7e" },
  { label: "Siatkówka Amatorska Kielce", key: "name", value: "9e8f9g" },
  { label: "Radom Trail Runners", key: "name", value: "0h0i1j" },
  { label: "Katowicki Klub Hokeja", key: "name", value: "1k2l3m" },
  { label: "Toruń Street Workout", key: "name", value: "2n4o5p" },
  { label: "Grupa Judo Radom", key: "name", value: "3p6q7r" },
  { label: "Crossfit Warriors Poznań", key: "name", value: "4s8t9u" },
  { label: "Koszykarze Sosnowiec", key: "name", value: "5u0v1w" },
  { label: "Ekipa Kajakowa Olsztyn", key: "name", value: "6x2y3z" },
  { label: "Bokserski Klub Kraków", key: "name", value: "7a4b5c" },
  { label: "Warszawscy Skaterzy", key: "name", value: "8c6d7e" },
  { label: "Wędkarze Zielona Góra", key: "name", value: "9e8f9g" },
  { label: "Piłkarze Ręczni Szczecin", key: "name", value: "0h0i1j" },
  { label: "Aktywni Spacerowicze Lublin", key: "name", value: "1k2l3m" },
  { label: "Drużyna Siatkówki Radom", key: "name", value: "2n4o5p" },
  { label: "Łyżwiarze Toruń", key: "name", value: "3p6q7r" },
  { label: "Skaterzy Poznań", key: "name", value: "4s8t9u" },
  { label: "Snowboardziści Zakopane", key: "name", value: "5u0v1w" },
  { label: "Koszykówka Amatorska Białystok", key: "name", value: "6x2y3z" },
  { label: "Warszawa Bowling Team", key: "name", value: "7a4b5c" },
];
