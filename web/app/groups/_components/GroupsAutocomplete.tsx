"use client";

import { Autocomplete, Chip, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SearchAttribute, SearchAttributeKeys, searchIcon, searchLabel } from "../mock";

const loading = true;

const options: SearchAttribute[] = [
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
  { value: "parkour", label: "Parkour", key: "category" },
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

  { value: "Pasjonaci piłki nożnej", key: "name" },
  { value: "Biegacze Gdynia", key: "name" },
  { value: "Warszawscy Triathloniści", key: "name" },
  { value: "Krakowscy Fani Siłowni", key: "name" },
  { value: "Wrocław Crossfit Team", key: "name" },
  { value: "Poznań Marathon Runners", key: "name" },
  { value: "Gdańsk Cycling Club", key: "name" },
  { value: "BMX Riders Katowice", key: "name" },
  { value: "Siatkówka Łódź", key: "name" },
  { value: "Koszykarze Radom", key: "name" },
  { value: "Bokserski Klub Szczecin", key: "name" },
  { value: "FF 1.0 Crossfit", key: "name" },
  { value: "Team Judo Białystok", key: "name" },
  { value: "Kielce Badminton Pro", key: "name" },
  { value: "Warsaw Yoga Friends", key: "name" },
  { value: "Białystok Running Group", key: "name" },
  { value: "Crossfit Heroes Gdańsk", key: "name" },
  { value: "Toruń Kajakarze", key: "name" },
  { value: "Siatkówka Pro Olsztyn", key: "name" },
  { value: "Lublin Parkour Team", key: "name" },
  { value: "Rowerzyści Rzeszów", key: "name" },
  { value: "Warszawski Klub Łuczniczy", key: "name" },
  { value: "Górska Wędrówka Kraków", key: "name" },
  { value: "Klub Tenisa Stołowego Łódź", key: "name" },
  { value: "Sztuki Walki Poznań", key: "name" },
  { value: "Kajakarze Szczecin", key: "name" },
  { value: "Piłkarze Plażowi Gdańsk", key: "name" },
  { value: "Zawodnicy MMA Wrocław", key: "name" },
  { value: "Siatkówka Plażowa Sopot", key: "name" },
  { value: "Warsaw Swimming Team", key: "name" },
  { value: "Golf Club Wrocław", key: "name" },
  { value: "Warszawa Ultimate Frisbee", key: "name" },
  { value: "Miłośnicy Biegania Opole", key: "name" },
  { value: "Beskidzkie Wędrówki Bielsko-Biała", key: "name" },
  { value: "Żeglarze Trójmiasto", key: "name" },
  { value: "Lublin Fit Squad", key: "name" },
  { value: "Fani Motocrossu Rzeszów", key: "name" },
  { value: "Biegacze z Zakopanego", key: "name" },
  { value: "Piłka Ręczna Tychy", key: "name" },
  { value: "Klub Szachowy Katowice", key: "name" },
  { value: "Łyżwiarze Białystok", key: "name" },
  { value: "Piłkarze Nożni Gdynia", key: "name" },
  { value: "Mistrzowie Karate Zabrze", key: "name" },
  { value: "Biegacze Ultramaratonu Gorzów", key: "name" },
  { value: "Koszykówka Pro Toruń", key: "name" },
  { value: "Pasjonaci Tenisa Ziemnego Lublin", key: "name" },
  { value: "Grupa Wspinaczkowa Tychy", key: "name" },
  { value: "Sporty Zimowe Zakopane", key: "name" },
  { value: "Siatkówka Amatorska Kielce", key: "name" },
  { value: "Radom Trail Runners", key: "name" },
  { value: "Katowicki Klub Hokeja", key: "name" },
  { value: "Toruń Street Workout", key: "name" },
  { value: "Grupa Judo Radom", key: "name" },
  { value: "Crossfit Warriors Poznań", key: "name" },
  { value: "Koszykarze Sosnowiec", key: "name" },
  { value: "Ekipa Kajakowa Olsztyn", key: "name" },
  { value: "Bokserski Klub Kraków", key: "name" },
  { value: "Warszawscy Skaterzy", key: "name" },
  { value: "Wędkarze Zielona Góra", key: "name" },
  { value: "Piłkarze Ręczni Szczecin", key: "name" },
  { value: "Aktywni Spacerowicze Lublin", key: "name" },
  { value: "Drużyna Siatkówki Radom", key: "name" },
  { value: "Łyżwiarze Toruń", key: "name" },
  { value: "Skaterzy Poznań", key: "name" },
  { value: "Snowboardziści Zakopane", key: "name" },
  { value: "Koszykówka Amatorska Białystok", key: "name" },
  { value: "Warszawa Bowling Team", key: "name" },
];
const ListboxComponent = (selected: SearchAttribute[], onDelete: (searchAttribute: SearchAttribute) => void) =>
  React.forwardRef(function ListboxComponent(
    props: React.HTMLAttributes<HTMLElement>,
    ref: React.LegacyRef<HTMLDivElement>
  ) {
    const { children, ...other } = props;

    return (
      <div {...other} ref={ref}>
        <Stack direction="row" gap={0.5} flexWrap="wrap" p={1} zIndex={100}>
          {selected.map((selection) => (
            <Chip
              variant="outlined"
              label={selection.key === "name" ? selection.value : selection.label}
              onDelete={() => onDelete(selection)}
            />
          ))}
        </Stack>
        {children}
      </div>
    );
  });

export const GroupsAutocomplete = () => {
  const [selected, setSelected] = useState<SearchAttribute[]>([]);

  const handleDelete = (toDelete: SearchAttribute) => {
    setSelected((prev) => prev.filter((p) => p.value !== toDelete.value));
  };

  return (
    <Autocomplete<SearchAttribute, true>
      multiple
      value={selected}
      onChange={(e, v, r, d) => {
        setSelected(v);
      }}
      options={options}
      sx={{
        width: 320,
        ".MuiAutocomplete-tag": {
          my: 0, // fix problem with chip inside autocomplete
        },
        ".MuiChip-label": {
          my: 0, // fix problem with chip inside autocomplete
        },
      }}
      groupBy={({ key }) => key}
      ListboxComponent={ListboxComponent(selected, handleDelete)}
      getOptionLabel={(option) => (option.key === "name" ? option.value : option.label)}
      renderTags={(value, getTagProps) => {
        return (
          <Stack direction="row" maxWidth="80%" width="min-content">
            {value.slice(0, 1).map((option, index: number) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={option.value}
                  component="div"
                  variant="outlined"
                  size="small"
                  label={option.key === "name" ? option.value : option.label}
                  {...tagProps}
                />
              );
            })}
            {value?.length > 1 && (
              <Chip
                {...getTagProps({ index: 1 })}
                component="div"
                variant="outlined"
                size="small"
                label={"+" + (value.length - 1)}
                onDelete={undefined}
              />
            )}
          </Stack>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="Search"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
      renderGroup={(params) => (
        <Stack px={2} gap={0.5}>
          <Typography variant="body1">{searchLabel[params.group as SearchAttributeKeys]}</Typography>
          {params.children}
        </Stack>
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Stack key={key} component="li" sx={{ "& > svg": { mr: 2, flexShrink: 0 } }} direction="row" {...optionProps}>
            {searchIcon[option.key]}
            {option.key === "name" ? option.value : option.label}
          </Stack>
        );
      }}
    />
  );
};
