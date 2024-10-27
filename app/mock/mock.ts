import ProfileLogo4x3_0 from "@/app/public/assets/profile_4x3_0.webp";
import ProfileLogo4x3_1 from "@/app/public/assets/profile_4x3_1.webp";
import ProfileLogo4x3_10 from "@/app/public/assets/profile_4x3_10.webp";
import ProfileLogo4x3_11 from "@/app/public/assets/profile_4x3_11.webp";
import ProfileLogo4x3_12 from "@/app/public/assets/profile_4x3_12.webp";
import ProfileLogo4x3_13 from "@/app/public/assets/profile_4x3_13.webp";
import ProfileLogo4x3_14 from "@/app/public/assets/profile_4x3_14.webp";
import ProfileLogo4x3_15 from "@/app/public/assets/profile_4x3_15.webp";
import ProfileLogo4x3_2 from "@/app/public/assets/profile_4x3_2.webp";
import ProfileLogo4x3_3 from "@/app/public/assets/profile_4x3_3.webp";
import ProfileLogo4x3_4 from "@/app/public/assets/profile_4x3_4.webp";
import ProfileLogo4x3_5 from "@/app/public/assets/profile_4x3_5.webp";
import ProfileLogo4x3_6 from "@/app/public/assets/profile_4x3_6.webp";
import ProfileLogo4x3_7 from "@/app/public/assets/profile_4x3_7.webp";
import ProfileLogo4x3_8 from "@/app/public/assets/profile_4x3_8.webp";
import ProfileLogo4x3_9 from "@/app/public/assets/profile_4x3_9.webp";

import GroupLogo4x3_0 from "@/app/public/assets/group_logo_0.webp";
import GroupLogo4x3_1 from "@/app/public/assets/group_logo_1.webp";
import GroupLogo4x3_10 from "@/app/public/assets/group_logo_10.webp";
import GroupLogo4x3_11 from "@/app/public/assets/group_logo_11.webp";
import GroupLogo4x3_12 from "@/app/public/assets/group_logo_12.webp";
import GroupLogo4x3_13 from "@/app/public/assets/group_logo_13.webp";
import GroupLogo4x3_14 from "@/app/public/assets/group_logo_14.webp";
import GroupLogo4x3_15 from "@/app/public/assets/group_logo_15.webp";
import GroupLogo4x3_2 from "@/app/public/assets/group_logo_2.webp";
import GroupLogo4x3_3 from "@/app/public/assets/group_logo_3.webp";
import GroupLogo4x3_4 from "@/app/public/assets/group_logo_4.webp";
import GroupLogo4x3_5 from "@/app/public/assets/group_logo_5.webp";
import GroupLogo4x3_6 from "@/app/public/assets/group_logo_6.webp";
import GroupLogo4x3_7 from "@/app/public/assets/group_logo_7.webp";
import GroupLogo4x3_8 from "@/app/public/assets/group_logo_8.webp";
import GroupLogo4x3_9 from "@/app/public/assets/group_logo_9.webp";

export const GroupLogo4x3 = [
  GroupLogo4x3_0,
  GroupLogo4x3_1,
  GroupLogo4x3_2,
  GroupLogo4x3_3,
  GroupLogo4x3_4,
  GroupLogo4x3_5,
  GroupLogo4x3_6,
  GroupLogo4x3_7,
  GroupLogo4x3_8,
  GroupLogo4x3_9,
  GroupLogo4x3_10,
  GroupLogo4x3_11,
  GroupLogo4x3_12,
  GroupLogo4x3_13,
  GroupLogo4x3_14,
  GroupLogo4x3_15,
];

export const ProfileLogo4x3 = [
  ProfileLogo4x3_0,
  ProfileLogo4x3_1,
  ProfileLogo4x3_2,
  ProfileLogo4x3_3,
  ProfileLogo4x3_4,
  ProfileLogo4x3_5,
  ProfileLogo4x3_6,
  ProfileLogo4x3_7,
  ProfileLogo4x3_8,
  ProfileLogo4x3_9,
  ProfileLogo4x3_10,
  ProfileLogo4x3_11,
  ProfileLogo4x3_12,
  ProfileLogo4x3_13,
  ProfileLogo4x3_14,
  ProfileLogo4x3_15,
];

import { StaticImageData } from "next/image";

interface SponsoredAttribute {
  id: string;
  value: boolean;
}

interface VerifiedAttribute {
  id: string;
  value: boolean;
}

interface RemoteAttribute {
  id: string;
  value: boolean;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  src: string | StaticImageData;
  createdAt: string;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  cities: City[];
  categories: Category[];
  events: Event[];
  users: GroupUser[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  users: EventUser[];
  canceled: boolean;
}

export interface GroupUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface EventUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface GroupUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface User {
  id: string;
  username: string;
  src: string | StaticImageData;
}

interface Category {
  value: string; // id
  label: string;
}

interface City {
  value: string; // id
  label: string;
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

export const DBCategory: Category[] = [
  { value: "football", label: "Piłka nożna" },
  { value: "chess", label: "Szachy" },
  { value: "walking", label: "Spacer" },
  { value: "gym", label: "Siłownia" },
  { value: "running", label: "Bieganie" },
  { value: "swimming", label: "Pływanie" },
  { value: "cycling", label: "Jazda na rowerze" },
  // { value: "hiking", label: "Wędrówki" },
  // { value: "yoga", label: "Joga" },
  // { value: "dancing", label: "Taniec" },
  // { value: "basketball", label: "Koszykówka" },
  // { value: "tennis", label: "Tenis" },
  // { value: "skiing", label: "Narciarstwo" },
  // { value: "climbing", label: "Wspinaczka" },
  // { value: "kayaking", label: "Kajakarstwo" },
  // { value: "badminton", label: "Badminton" },
  // { value: "table_tennis", label: "Tenis stołowy" },
  // { value: "golf", label: "Golf" },
  // { value: "horse_riding", label: "Jazda konna" },
  // { value: "skating", label: "Łyżwiarstwo" },
  // { value: "surfing", label: "Surfing" },
  // { value: "fishing", label: "Wędkarstwo" },
  // { value: "volleyball", label: "Siatkówka" },
  // { value: "handball", label: "Piłka ręczna" },
  // { value: "archery", label: "Łucznictwo" },
  // { value: "boxing", label: "Boks" },
  // { value: "fencing", label: "Szermierka" },
  // { value: "triathlon", label: "Triathlon" },
  // { value: "snowboarding", label: "Snowboarding" },
  // { value: "crossfit", label: "Crossfit" },
  // { value: "pilates", label: "Pilates" },
  // { value: "rowing", label: "Wioślarstwo" },
  // { value: "rock_climbing", label: "Wspinaczka skalna" },
  // { value: "skateboarding", label: "Jazda na deskorolce" },
  // { value: "kickboxing", label: "Kickboxing" },
  // { value: "judo", label: "Judo" },
  // { value: "karate", label: "Karate" },
  // { value: "taekwondo", label: "Taekwondo" },
  // { value: "mma", label: "MMA" },
  // { value: "cricket", label: "Krykiet" },
  // { value: "baseball", label: "Baseball" },
  // { value: "softball", label: "Softball" },
  // { value: "sailing", label: "Żeglarstwo" },
  // { value: "scuba_diving", label: "Nurkowanie" },
  // { value: "paragliding", label: "Paralotniarstwo" },
  // { value: "skydiving", label: "Skoki spadochronowe" },
  // { value: "bungee_jumping", label: "Skoki na bungee" },
  // { value: "parkour", label: "Parkour" },
  // { value: "mountaineering", label: "Alpinizm" },
  // { value: "snorkeling", label: "Snurkowanie" },
  // { value: "canoeing", label: "Kajakarstwo górskie" },
  // { value: "darts", label: "Rzutki" },
  // { value: "bowling", label: "Kręgle" },
  // { value: "equestrian", label: "Sporty jeździeckie" },
  // { value: "ice_hockey", label: "Hokej na lodzie" },
  // { value: "figure_skating", label: "Łyżwiarstwo figurowe" },
  // { value: "rugby", label: "Rugby" },
  // { value: "american_football", label: "Futbol amerykański" },
  // { value: "paddleboarding", label: "Stand-up paddleboarding" },
  // { value: "windsurfing", label: "Windsurfing" },
  // { value: "kitesurfing", label: "Kitesurfing" },
  // { value: "trampoline", label: "Skakanie na trampolinie" },
  // { value: "orienteering", label: "Biegi na orientację" },
  // { value: "biathlon", label: "Biathlon" },
  // { value: "powerlifting", label: "Trójbój siłowy" },
  // { value: "bodybuilding", label: "Kulturystyka" },
  // { value: "capoeira", label: "Capoeira" },
  // { value: "kung_fu", label: "Kung Fu" },
  // { value: "sambo", label: "Sambo" },
  // { value: "sumo", label: "Sumo" },
  // { value: "motocross", label: "Motocross" },
  // { value: "kart_racing", label: "Karting" },
  // { value: "futsal", label: "Futsal" },
  // { value: "lacrosse", label: "Lacrosse" },
  // { value: "polo", label: "Polo" },
  // { value: "dragon_boat_racing", label: "Wyścigi łodzi smoczych" },
  // { value: "curling", label: "Curling" },
  // { value: "bobsleigh", label: "Bobsleje" },
  // { value: "skeleton", label: "Skeleton" },
  // { value: "luge", label: "Saneczkarstwo" },
  // { value: "speed_skating", label: "Łyżwiarstwo szybkie" },
  // { value: "sled_dog_racing", label: "Wyścigi psich zaprzęgów" },
  // { value: "freestyle_skiing", label: "Narciarstwo dowolne" },
  // { value: "snowshoeing", label: "Rakiety śnieżne" },
  // { value: "paintball", label: "Paintball" },
  // { value: "airsoft", label: "Airsoft" },
  // { value: "disc_golf", label: "Disc Golf" },
  // { value: "ultimate_frisbee", label: "Ultimate Frisbee" },
  // { value: "water_polo", label: "Piłka wodna" },
  // { value: "synchronized_swimming", label: "Pływanie synchroniczne" },
  // { value: "cliff_diving", label: "Skoki do wody z klifu" },
  // { value: "high_jump", label: "Skok wzwyż" },
  // { value: "long_jump", label: "Skok w dal" },
  // { value: "triple_jump", label: "Trójskok" },
  // { value: "pole_vault", label: "Skok o tyczce" },
  // { value: "hammer_throw", label: "Rzut młotem" },
  // { value: "discus_throw", label: "Rzut dyskiem" },
  // { value: "javelin_throw", label: "Rzut oszczepem" },
  // { value: "shot_put", label: "Pchnięcie kulą" },
  // { value: "pentathlon", label: "Pięciobój" },
  // { value: "decathlon", label: "Dziesięciobój" },
  // { value: "e_sports", label: "E-sport" },
  // { value: "speedcubing", label: "Speedcubing" },
  // { value: "strongman", label: "Strongman" },
  // { value: "cheerleading", label: "Cheerleading" },
  // { value: "kite_flying", label: "Latanie latawcem" },
  // { value: "bocce", label: "Bule (Bocce)" },
  // { value: "pétanque", label: "Pétanque" },
  // { value: "croquet", label: "Krokiet" },
  // { value: "shuffleboard", label: "Shuffleboard" },
  // { value: "tug_of_war", label: "Przeciąganie liny" },
  // { value: "tetherball", label: "Tetherball" },
  // { value: "quiddich", label: "Quidditch" },
  // { value: "robot_wars", label: "Wojny robotów" },
  // { value: "drone_racing", label: "Wyścigi dronów" },
  // { value: "rock_paper_scissors", label: "Kamień, papier, nożyce" },
  // { value: "arm_wrestling", label: "Siłowanie na rękę" },
  // { value: "cornhole", label: "Cornhole" },
  // { value: "dodgeball", label: "Dwa ognie" },
  // { value: "kickball", label: "Kickball" },
  // { value: "gaelic_football", label: "Futbol gaelicki" },
  // { value: "hurling", label: "Hurling" },
  // { value: "paddle_tennis", label: "Paddle Tennis" },
  // { value: "pickleball", label: "Pickleball" },
  // { value: "street_hockey", label: "Hokej uliczny" },
  // { value: "floorball", label: "Unihokej" },
  // { value: "sepaktakraw", label: "Sepak Takraw" },
  // { value: "kabaddi", label: "Kabaddi" },
  // { value: "underwater_rugby", label: "Podwodne rugby" },
  // { value: "underwater_hockey", label: "Podwodny hokej" },
  // { value: "footvolley", label: "Footvolley" },
  // { value: "bossaball", label: "Bossaball" },
  // { value: "teqball", label: "Teqball" },
  // { value: "slacklining", label: "Slacklining" },
  // { value: "kite_surfing", label: "Kite Surfing" },
  // { value: "zorbing", label: "Zorbing" },
  // { value: "snowkiting", label: "Snowkiting" },
  // { value: "speed_skiing", label: "Narciarstwo szybkie" },
  // { value: "sandboarding", label: "Sandboarding" },
  // { value: "ice_climbing", label: "Wspinaczka lodowa" },
  // { value: "gliding", label: "Szybownictwo" },
  // { value: "parachuting", label: "Spadochroniarstwo" },
  // { value: "base_jumping", label: "BASE jumping" },
  // { value: "wingsuit_flying", label: "Latanie w wingsuit" },
  // { value: "park_golf", label: "Park Golf" },
  // { value: "footgolf", label: "Footgolf" },
  // { value: "swamp_football", label: "Błotna piłka nożna" },
  // { value: "roller_derby", label: "Roller Derby" },
  // { value: "underwater_basket_weaving", label: "Podwodne plecenie koszy" },
  // { value: "soapbox_racing", label: "Wyścigi mydelniczek" },
  // { value: "chessboxing", label: "Chessboxing" },
  // { value: "gaga_ball", label: "Gaga Ball" },
  // { value: "spikeball", label: "Spikeball" },
  // { value: "freediving", label: "Freediving" },
  // { value: "bog_snorkeling", label: "Nurkowanie w bagnie" },
  // { value: "log_rolling", label: "Toczenie kłody" },
  // { value: "roller_skiing", label: "Narciarstwo na rolkach" },
  // { value: "handcycle_racing", label: "Wyścigi rowerów ręcznych" },
  // { value: "canoe_polo", label: "Kajak polo" },
  // { value: "slalom_skiing", label: "Narciarski slalom" },
  // { value: "tower_running", label: "Bieganie po schodach" },
  // { value: "stair_climbing", label: "Wspinaczka po schodach" },
  // { value: "swimming_with_dolphins", label: "Pływanie z delfinami" },
  // { value: "virtual_reality_sports", label: "Sporty wirtualnej rzeczywistości" },
  // { value: "bouldering", label: "Buldering" },
  // { value: "outrigger_canoeing", label: "Outrigger Canoeing" },
  // { value: "canoe_sprinting", label: "Kajakarstwo sprinterskie" },
  // { value: "flatwater_kayaking", label: "Kajakarstwo na płaskich wodach" },
];

export const DBUser: User[] = [
  { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", username: "seoquesto", src: ProfileLogo4x3_0 },
  { id: "f27c9d4b-8c91-489f-a72a-ec1923f3f0b5", username: "techwizard", src: ProfileLogo4x3_1 },
  { id: "b4f4bc78-e1c5-44b3-b4af-021aa9ed64b5", username: "marketingguru", src: ProfileLogo4x3_2 },
  { id: "c2b66e0e-663b-4e8d-a6e4-1845c4fbdf0f", username: "designmaster", src: ProfileLogo4x3_3 },
  { id: "a57b5fd3-3b27-4f11-bf3d-839e4b79231b", username: "codemaverick", src: ProfileLogo4x3_4 },
  { id: "7ad9b292-1d2e-4fc2-8175-0c31d965d3c2", username: "analyticspro", src: ProfileLogo4x3_5 },
  { id: "d91ff2cd-f89b-44b6-b33d-5741c4f12514", username: "webcreator", src: ProfileLogo4x3_6 },
  { id: "42f6d06f-6b34-4b99-b676-215c97f681b8", username: "growthhacker", src: ProfileLogo4x3_7 },
  { id: "ff48e1df-4bde-4563-b5b4-65fd0d8c909b", username: "adexperto", src: ProfileLogo4x3_8 },
  { id: "2a5c8f18-3ff4-4b0b-93b6-48b0ef17e7c1", username: "conversionking", src: ProfileLogo4x3_9 },
  { id: "e5b8db69-9c48-4b21-9182-61a282f72e3e", username: "contentninja", src: ProfileLogo4x3_10 },
  { id: "cd88d305-daff-4a72-a7f2-7585279beed8", username: "trafficgenius", src: ProfileLogo4x3_11 },
  { id: "85e073df-5de7-409f-a1b3-0b6ad4b98790", username: "brandbuilder", src: ProfileLogo4x3_12 },
  { id: "94d93bfb-b671-4a55-81c4-5d89d5fd632f", username: "leadstrategist", src: ProfileLogo4x3_13 },
  { id: "a9b5f4da-97e1-4d85-b32e-0ec2aaf5b86e", username: "devopschamp", src: ProfileLogo4x3_14 },
  { id: "e3cb6e7d-10b1-4c5b-92ea-e18421c9c93b", username: "frontenddev", src: ProfileLogo4x3_15 },
];

export const DBCity: City[] = [
  { value: "warsaw", label: "Warszawa" },
  { value: "krakow", label: "Kraków" },
  { value: "gdansk", label: "Gdańsk" },
  { value: "wroclaw", label: "Wrocław" },
  { value: "poznan", label: "Poznań" },
  { value: "lodz", label: "Łódź" },
  // { value: "szczecin", label: "Szczecin" },
  // { value: "lublin", label: "Lublin" },
  // { value: "bydgoszcz", label: "Bydgoszcz" },
  // { value: "katowice", label: "Katowice" },
  // { value: "bialystok", label: "Białystok" },
  // { value: "czestochowa", label: "Częstochowa" },
  // { value: "radom", label: "Radom" },
  // { value: "torun", label: "Toruń" },
  // { value: "kielce", label: "Kielce" },
  // { value: "gliwice", label: "Gliwice" },
  // { value: "zabrze", label: "Zabrze" },
  // { value: "olsztyn", label: "Olsztyn" },
  // { value: "rzeszow", label: "Rzeszów" },
  // { value: "zielona_gora", label: "Zielona Góra" },
  // { value: "opole", label: "Opole" },
  // { value: "gorzow_wielkopolski", label: "Gorzów Wielkopolski" },
  // { value: "plock", label: "Płock" },
  // { value: "bielsko_biala", label: "Bielsko-Biała" },
  // { value: "walbrzych", label: "Wałbrzych" },
  // { value: "legnica", label: "Legnica" },
  // { value: "elblag", label: "Elbląg" },
  // { value: "tarnow", label: "Tarnów" },
  // { value: "chorzow", label: "Chorzów" },
  // { value: "kalisz", label: "Kalisz" },
  // { value: "gdynia", label: "Gdynia" },
  // { value: "sosnowiec", label: "Sosnowiec" },
  // { value: "ruda_slaska", label: "Ruda Śląska" },
  // { value: "tychy", label: "Tychy" },
  // { value: "dabrowa_gornicza", label: "Dąbrowa Górnicza" },
  // { value: "pila", label: "Piła" },
  // { value: "ostrow_wielkopolski", label: "Ostrów Wielkopolski" },
  // { value: "konin", label: "Konin" },
  // { value: "pabianice", label: "Pabianice" },
  // { value: "suwalki", label: "Suwałki" },
  // { value: "grudziadz", label: "Grudziądz" },
  // { value: "wloclawek", label: "Włocławek" },
  // { value: "lomza", label: "Łomża" },
  // { value: "glogow", label: "Głogów" },
  // { value: "zamosc", label: "Zamość" },
  // { value: "jastrzebie_zdroj", label: "Jastrzębie-Zdrój" },
  // { value: "mielec", label: "Mielec" },
  // { value: "swidnica", label: "Świdnica" },
  // { value: "stargard", label: "Stargard" },
  // { value: "belchatow", label: "Bełchatów" },
  // { value: "ciechanow", label: "Ciechanów" },
  // { value: "krosno", label: "Krosno" },
  // { value: "tczew", label: "Tczew" },
  // { value: "malbork", label: "Malbork" },
  // { value: "kwidzyn", label: "Kwidzyn" },
  // { value: "nowy_sacz", label: "Nowy Sącz" },
  // { value: "oswiecim", label: "Oświęcim" },
  // { value: "przemysl", label: "Przemyśl" },
  // { value: "zakopane", label: "Zakopane" },
  // { value: "ostroleka", label: "Ostrołęka" },
];

const DBGroups: Group[] = [];

DBCity.forEach((city) => {
  DBCategory.forEach((category) => {
    GroupLogo4x3.forEach((groupSrc, groupIdx) => {
      const groupUsersCount = (groupIdx * 12) % DBUser.length || 1;
      const groupEventsCount = groupIdx * 5;

      const groupCratedAt = new Date();
      groupCratedAt.setDate(-31);
      groupCratedAt.setDate(groupIdx * 5);

      DBGroups.push({
        id: `group_${groupIdx}`,
        title: getLoremIpsumSentenses(1, groupIdx),
        description: getLoremIpsumSentenses(2, groupIdx + 1),
        createdAt: groupCratedAt.toISOString(),
        src: groupSrc,
        cities: [
          {
            label: city.label,
            value: city.value,
          },
        ],
        categories: [
          {
            label: category.label,
            value: category.value,
          },
        ],
        sponsored: {
          id: `group_${groupIdx}_sponsored`,
          value: groupIdx % 2 === 0,
        },
        verified: {
          id: `group_${groupIdx}_verified`,
          value: groupIdx % 3 === 0,
        },

        remote: {
          id: `group_${groupIdx}_remote`,
          value: groupIdx % 5 === 0,
        },
        events: Array(groupEventsCount)
          .fill("")
          .map((_, eventIdx) => {
            const eventCreatedAt = new Date(groupCratedAt);
            eventCreatedAt.setDate(eventCreatedAt.getDate() + eventIdx * 2);
            return {
              id: `group_${groupIdx}_event_${eventIdx}`,
              title: getLoremIpsumSentenses(1, groupIdx + eventIdx),
              description: getLoremIpsumSentenses(2, groupIdx + eventIdx + 1),
              createdAt: eventCreatedAt.toISOString(),
              canceled: eventIdx % 2 === 0,
              users: Array(groupUsersCount)
                .fill("")
                .map((_, userIdx) => {
                  const user = DBUser[userIdx];
                  return {
                    isHost: userIdx === 0,
                    isModerator: userIdx === 1 || userIdx === 2,
                    user: {
                      id: user.id,
                      username: user.username,
                      src: user.src,
                    },
                  };
                }),
            };
          }),
        users: Array(groupUsersCount)
          .fill("")
          .map((_, userIdx) => {
            const user = DBUser[userIdx];

            return {
              isHost: userIdx === 0,
              isModerator: userIdx === 1 || userIdx === 2,
              user: {
                id: user.id,
                username: user.username,
                src: user.src,
              },
            };
          }),
      });
    });
  });
});

export interface Attributes {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
}

export interface StackedGroupAttributes extends Attributes {
  city: City;
  category: Category;
}

export type GroupTile = Pick<Group, "id" | "title" | "description" | "src" | "createdAt" | "cities" | "categories"> & {
  eventsLength: number;
  userLength: number;
} & Attributes;

export interface StackedGroups {
  attributes: StackedGroupAttributes;
  tiles: GroupTile[];
}

const city: City = DBCity[0];
const category: Category = DBCategory[0];
const sponsored = false;
const remote = false;
const verified = false;

export const getStackedGroups = (): StackedGroups[] => {
  const groupsByCity = DBGroups.filter((group) => group.cities.some((c) => c.value === city.value)) ?? [];
  const groupsByCategory =
    groupsByCity.filter((group) => group.categories.some((c) => c.value === category.value)) ?? [];

  if (groupsByCategory.length <= 0) {
    return [];
  }

  const filtered = groupsByCategory.filter((g) => {
    let numToValidate = 0;
    let numToValidateCounter = 0;

    sponsored && numToValidate++;
    remote && numToValidate++;
    verified && numToValidate++;

    sponsored && g.sponsored.value && numToValidateCounter++;
    remote && g.remote.value && numToValidateCounter++;
    verified && g.verified.value && numToValidateCounter++;

    return numToValidateCounter === numToValidate;
  });

  return [
    {
      attributes: {
        category: category,
        city: city,
        remote: remote,
        sponsored: sponsored,
        verified: verified,
      },
      tiles: filtered.map<GroupTile>((group) => {
        return {
          id: group.id,
          title: group.title,
          createdAt: group.createdAt,
          description: group.description,
          eventsLength: group.events.length,
          userLength: group.users.length,
          remote: group.remote.value,
          sponsored: group.sponsored.value,
          src: group.src,
          verified: group.verified.value,
          categories: group.categories,
          cities: group.cities,
        };
      }),
    },
  ];
};

export const getGroup = (groupId: string) => {
  const group = DBGroups.find((g) => g.id === groupId);

  if (!group) {
    return null;
  }

  const upcoming = [];
  const pending = [];
  const recurring = [];
  const past = [];
  const cancelled = [];

  group.events.forEach((event) => {
    if (event.canceled) {
      cancelled.push(event);
      return;
    }
  });
};
