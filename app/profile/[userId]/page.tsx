"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { LocalTime } from "@/app/common/components/LocalTime/LocalTime";
import { Link } from "@/app/common/components/next-link";
import { getUserWithProfileQueryOptions } from "@/app/common/graphql/options/query/getUserWithProfileQueryOptions";
import {
  AddOutlined,
  ArrowRightAltOutlined,
  CalendarMonthOutlined,
  CategoryOutlined,
  ComputerOutlined,
  EmailOutlined,
  ExpandMoreOutlined,
  Facebook,
  HomeOutlined,
  Instagram,
  MoreHorizOutlined,
  MusicNote,
  PeopleOutline,
  Phone,
  PlaceOutlined,
  SendOutlined,
  X,
  YouTube,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const { userId: _userId }: { userId: string } = useParams();

  const { data } = useSuspenseQuery(getUserWithProfileQueryOptions({ userId: _userId }));

  if (!data?.getUserWithProfile) {
    return notFound();
  }

  const {
    getUserWithProfile: {
      id,
      createdAt,
      email,
      largePhoto,
      mediumPhoto,
      role,
      smallPhoto = "",
      username,
      profile: { bio, categories, cities, facebook, phoneNumber, tiktok, twitter, youtube, instagram },
    },
    getGroupTilesByUserId: { count: groupsCount, groups },
    getEventTilesByUserId: { count: eventsCount, events },
  } = data;

  const comment = (
    <ListItem
      sx={{
        gap: 1,
        px: "24px",
        py: "16px",
        alignItems: "flex-start",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "divider",
      }}
    >
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          src={smallPhoto}
          sx={{
            width: "48px",
            height: "48px",
          }}
        />
      </ListItemAvatar>
      <Stack direction="row" gap={1} justifyContent="space-between" width="100%" alignItems="flex-start">
        <Stack direction="column" gap={1} justifyContent="flex-start" alignItems="flex-start">
          <ClampTypography variant="body1" clamp={1} color="secondary">
            seoquesto
          </ClampTypography>
          <Typography variant="body2" color="text.secondary">
            Minim fugiat quis est ullamco est consequat nostrud ut fugiat qui ullamco ea enim. Reprehenderit id dolore
            deserunt nulla ullamco qui pariatur commodo reprehenderit pariatur occaecat amet. Ut dolor anim enim anim
            amet aliquip deserunt do duis exercitation in reprehenderit sunt. Pariatur veniam reprehenderit consequat
            laborum amet. Esse commodo qui commodo incididunt enim laborum consectetur fugiat sint ea velit. Adipisicing
            nostrud voluptate consectetur ipsum nostrud ea amet occaecat consectetur consectetur nulla ex consectetur.
            Minim nostrud ullamco do sunt laboris culpa ea qui aliqua eiusmod incididunt. Fugiat dolor non cillum anim.
          </Typography>
        </Stack>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Typography noWrap variant="body3" color="text.secondary">
            March 15, 2024
          </Typography>
          <IconButton size="small" onClick={() => alert("Not implemented.")}>
            <MoreHorizOutlined fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </ListItem>
  );

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to right, #59c173, #a17fe0, #5d26c1)",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="column" gap={3} pt={{ xs: 3, sm: 6 }} pb={{ xs: 3, sm: 8 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" position="relative">
              <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={3}>
                <Badge
                  slotProps={{
                    badge: {
                      style: {
                        borderRadius: "50%",
                        backgroundColor: "rgb(114, 214, 58)",
                        right: "1px",
                        top: "1px",
                        width: "16px",
                        height: "16px",
                      },
                    },
                  }}
                  color="success"
                  variant="dot"
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={mediumPhoto}
                    sx={{
                      width: "128px",
                      height: "128px",
                    }}
                  />
                </Badge>
                <Stack direction="column">
                  <Typography fontWeight={500} variant="h5" fontSize="1.5rem">
                    {username}
                  </Typography>
                  <Typography variant="body1" color="secondary.contrastText">
                    Łódź, Polska
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" gap={3}>
                <Stack direction="row" gap={2}>
                  <Stack direction="column">
                    <Typography variant="h5" fontSize="0.875rem" textAlign="center">
                      6
                    </Typography>
                    <Typography variant="body3" textAlign="center">
                      Wydarzeń
                    </Typography>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "auto",
                      bgcolor: "secondary.contrastText",
                    }}
                  />
                  <Stack direction="column">
                    <Typography variant="h5" fontSize="0.875rem" textAlign="center" sx={{ fontWeight: 500 }}>
                      6
                    </Typography>
                    <Typography variant="body3" textAlign="center">
                      Grup
                    </Typography>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "auto",
                      bgcolor: "secondary.contrastText",
                    }}
                  />
                  <Stack direction="column">
                    <Typography variant="h5" fontSize="0.875rem" textAlign="center">
                      6
                    </Typography>
                    <Typography variant="body3" textAlign="center">
                      Znajomych
                    </Typography>
                  </Stack>
                </Stack>
                <IconButton
                  color="inherit"
                  size="small"
                  sx={{
                    width: "min-content",
                    height: "min-content",
                  }}
                  onClick={() => alert("Not implemented.")}
                >
                  <MoreHorizOutlined fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography
                fontSize="0.875rem"
                variant="body1"
                color="primary.contrastText"
                component={Link}
                href="/"
                sx={{
                  textDecoration: "none",
                  margin: 0,
                }}
              >
                O mnie
              </Typography>
              x
              <Divider
                orientation="vertical"
                sx={{
                  height: "auto",
                  bgcolor: "secondary.contrastText",
                }}
              />
              <Typography
                fontSize="0.875rem"
                variant="body1"
                color="primary.contrastText"
                component={Link}
                href="/"
                sx={{
                  textDecoration: "none",
                  margin: 0,
                }}
              >
                Znajomi
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Stack py={{ xs: 3 }} my={{ xs: -3, sm: -8 }} gap={3}>
          <Grid2 container spacing={{ xs: 2, sm: 3 }} direction={{ xs: "column", sm: "row" }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Stack gap={4}>
                <Card
                  elevation={1}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardHeader
                    sx={{
                      padding: "18px 24px",
                    }}
                    title={<Typography variant="h5">Kontakt</Typography>}
                    action={
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        endIcon={<SendOutlined fontSize="small" />}
                      >
                        Wiadomość
                      </Button>
                    }
                  />
                  <CardContent
                    sx={{
                      p: "0 24px 24px",
                    }}
                  >
                    <Stack direction="column" gap={2}>
                      {email && (
                        <Stack direction="row" gap={2}>
                          <EmailOutlined />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              E-mail
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`mailto:${email}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {email}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {facebook && (
                        <Stack direction="row" gap={2}>
                          <Facebook />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              Facebook
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`https://www.facebook.com/${facebook}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {facebook}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {instagram && (
                        <Stack direction="row" gap={2}>
                          <Instagram />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              Instagram
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`https://www.instagram.com/${instagram}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {instagram}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {twitter && (
                        <Stack direction="row" gap={2}>
                          <X />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              X
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`https://www.x.com/${twitter}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {twitter}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}

                      {tiktok && (
                        <Stack direction="row" gap={2}>
                          <MusicNote />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              TikTok
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`https://www.tiktok.com/@${tiktok}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {tiktok}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}

                      {youtube && (
                        <Stack direction="row" gap={2}>
                          <YouTube />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              YouTube
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`https://www.youtube.com/@${youtube}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {youtube}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                      {phoneNumber && (
                        <Stack direction="row" gap={2}>
                          <Phone />
                          <Stack direction="column" alignItems="flex-start">
                            <Typography fontSize="0.875rem" variant="body2" color="text.secondary">
                              Telefon
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              variant="body1"
                              color="secondary"
                              component={Link}
                              href={`tel:${phoneNumber}`}
                              sx={{
                                textDecoration: "none",
                                margin: 0,
                              }}
                            >
                              {phoneNumber}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
                {cities.length > 0 && (
                  <Card
                    elevation={1}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <CardHeader
                      sx={{
                        padding: "18px 24px",
                      }}
                      title={<Typography variant="h5">Lokalizacja</Typography>}
                      subheader={
                        <Typography variant="body2" color="text.secondary">
                          Lokalizację, którymi jestem zainteresowana-y
                        </Typography>
                      }
                    />
                    <CardContent
                      sx={{
                        p: "0 24px 24px",
                      }}
                    >
                      <Stack direction="row" gap={2} flexWrap="wrap">
                        {cities.map(({ city }, index) => {
                          return (
                            <Chip
                              icon={index === 0 ? <HomeOutlined fontSize="small" /> : undefined}
                              label={city.label}
                            />
                          );
                        })}
                      </Stack>
                    </CardContent>
                  </Card>
                )}

                {categories.length > 0 && (
                  <Card
                    elevation={1}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <CardHeader
                      sx={{
                        padding: "18px 24px",
                      }}
                      title={<Typography variant="h5">Zainteresowania</Typography>}
                      subheader={
                        <Typography variant="body2" color="text.secondary">
                          Kategorie, którymi jestem zainteresowana-y
                        </Typography>
                      }
                    />
                    <CardContent
                      sx={{
                        p: "0 24px 24px",
                      }}
                    >
                      <Stack direction="row" gap={2} flexWrap="wrap">
                        {categories.map(({ category }) => (
                          <Chip label={category.label} />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <Stack gap={4}>
                {bio && (
                  <Card
                    elevation={1}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <CardHeader
                      sx={{
                        padding: "18px 24px",
                      }}
                      title={<Typography variant="h5">O mnie</Typography>}
                      subheader={
                        <Typography variant="body2" color="text.secondary">
                          Kilka słów o mnie
                        </Typography>
                      }
                    />
                    <CardContent
                      sx={{
                        p: "0 24px 24px",
                      }}
                    >
                      <Typography variant="body1">{bio}</Typography>
                    </CardContent>
                  </Card>
                )}

                <Card
                  elevation={1}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardHeader
                    sx={{
                      padding: "18px 24px",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderBottomColor: "divider",
                    }}
                    title={
                      <Typography variant="h5">
                        Wszystkie grupy
                        <small
                          style={{
                            marginLeft: "6px",
                            fontSize: "0.625rem",
                          }}
                        >
                          ({groupsCount})
                        </small>
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary">
                        Grupy do których przynależę
                      </Typography>
                    }
                  />
                  <CardContent
                    sx={{
                      p: "0 0 24px",
                      maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <List disablePadding>
                      {groups.map(({ id, smallPhoto, categories, cities, title, usersCount }) => (
                        <ListItem
                          key={id}
                          sx={{
                            gap: 3,
                            px: "24px",
                            py: "16px",
                            alignItems: "flex-start",
                            borderBottomWidth: "1px",
                            borderBottomStyle: "solid",
                            borderBottomColor: "divider",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              variant="rounded"
                              src={smallPhoto}
                              sx={{
                                width: "128px",
                                height: "128px",
                              }}
                            />
                          </ListItemAvatar>
                          <Stack pt={0.5} direction="row" justifyContent="space-between" width="100%">
                            <Stack gap={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
                              {categories.length > 0 && (
                                <Button
                                  size="small"
                                  color="secondary"
                                  variant="contained"
                                  startIcon={<CategoryOutlined />}
                                  endIcon={categories.length > 1 && <ExpandMoreOutlined />}
                                  onClick={() => alert("Not implemented.")}
                                  sx={{
                                    fontWeight: "400",
                                    borderRadius: 0.5,
                                    py: "2px",
                                    px: 1,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {categories.length > 1
                                    ? `${categories[0].label}, +${categories.length - 1} inne`
                                    : categories[0].label}
                                </Button>
                              )}

                              <ClampTypography variant="h4" clamp={1}>
                                {title}
                              </ClampTypography>

                              <Stack direction="row" gap={0.5} alignItems="center">
                                {cities.length > 0 && (
                                  <Button
                                    variant="text"
                                    onClick={() => alert("Not implemented.")}
                                    endIcon={cities.length > 1 ? <ExpandMoreOutlined /> : undefined}
                                    startIcon={<PlaceOutlined />}
                                    sx={{
                                      color: "text.secondary",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {cities.length > 1
                                      ? `${cities[0].label}, +${cities.length - 1} inne`
                                      : cities[0].label}
                                  </Button>
                                )}
                                {cities.length === 0 && (
                                  <Stack
                                    direction="row"
                                    gap={1}
                                    mr={1}
                                    alignItems="center"
                                    sx={{
                                      color: "text.secondary",
                                      fontWeight: "400",
                                    }}
                                  >
                                    <ComputerOutlined fontSize="small" />
                                    <Typography variant="body2">Online</Typography>
                                  </Stack>
                                )}
                                <Divider
                                  orientation="vertical"
                                  sx={{
                                    height: "45%",
                                  }}
                                />
                                <Stack
                                  direction="row"
                                  gap={1}
                                  ml={1}
                                  alignItems="center"
                                  sx={{
                                    color: "text.secondary",
                                    fontWeight: "400",
                                  }}
                                >
                                  <PeopleOutline fontSize="small" />
                                  <Typography variant="body2"> {usersCount} members</Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Stack gap={2} alignItems="center" alignSelf="center">
                              <Button
                                size="large"
                                color="secondary"
                                endIcon={<ArrowRightAltOutlined fontSize="large" />}
                                sx={{
                                  textWrap: "nowrap",
                                  alignSelf: "center",
                                }}
                              >
                                Zobacz grupę
                              </Button>
                            </Stack>
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination count={6} variant="text" shape="rounded" />
                  </CardActions>
                </Card>
                <Card
                  elevation={1}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardHeader
                    sx={{
                      padding: "18px 24px",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderBottomColor: "divider",
                    }}
                    title={
                      <Typography variant="h5">
                        Wszystkie wydarzenia
                        <small
                          style={{
                            marginLeft: "6px",
                            fontSize: "0.625rem",
                          }}
                        >
                          ({eventsCount})
                        </small>
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary">
                        Wydarzenia do których przynależę
                      </Typography>
                    }
                  />
                  <CardContent
                    sx={{
                      p: "0 0 24px",
                      maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <List disablePadding>
                      {events.map(
                        ({
                          id,
                          canceled,
                          categories,
                          cities,

                          smallPhoto,
                          startAt,
                          title,
                          usersCount,
                        }) => (
                          <ListItem
                            key={id}
                            sx={{
                              gap: 3,
                              px: "24px",
                              py: "16px",
                              alignItems: "flex-start",
                              borderBottomWidth: "1px",
                              borderBottomStyle: "solid",
                              borderBottomColor: "divider",
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                variant="rounded"
                                src={smallPhoto}
                                sx={{
                                  width: "128px",
                                  height: "128px",
                                }}
                              />
                            </ListItemAvatar>
                            <Stack pt={0.5} direction="row" justifyContent="space-between" width="100%">
                              <Stack gap={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
                                {categories.length > 0 && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CategoryOutlined />}
                                    endIcon={categories.length > 1 && <ExpandMoreOutlined />}
                                    onClick={() => alert("Not implemented.")}
                                    sx={{
                                      fontWeight: "400",
                                      borderRadius: 0.5,
                                      py: "2px",
                                      px: 1,
                                      fontSize: "0.75rem",
                                    }}
                                  >
                                    {categories.length > 1
                                      ? `${categories[0].label}, +${categories.length - 1} inne`
                                      : categories[0].label}
                                  </Button>
                                )}
                                <ClampTypography variant="h4" clamp={1}>
                                  {title}
                                </ClampTypography>
                                <Stack direction="row" gap={0.5} alignItems="center">
                                  {cities.length > 0 && (
                                    <Button
                                      variant="text"
                                      onClick={() => alert("Not implemented.")}
                                      endIcon={cities.length > 1 ? <ExpandMoreOutlined /> : undefined}
                                      startIcon={<PlaceOutlined />}
                                      sx={{
                                        color: "text.secondary",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {cities.length > 1
                                        ? `${cities[0].label}, +${cities.length - 1} inne`
                                        : cities[0].label}
                                    </Button>
                                  )}
                                  {cities.length === 0 && (
                                    <Stack
                                      direction="row"
                                      gap={1}
                                      mr={1}
                                      alignItems="center"
                                      sx={{
                                        color: "text.secondary",
                                        fontWeight: "400",
                                      }}
                                    >
                                      <ComputerOutlined fontSize="small" />
                                      <Typography variant="body2">Online</Typography>
                                    </Stack>
                                  )}
                                  <Divider
                                    orientation="vertical"
                                    sx={{
                                      height: "45%",
                                    }}
                                  />
                                  <Stack
                                    direction="row"
                                    gap={1}
                                    ml={1}
                                    alignItems="center"
                                    sx={{
                                      color: "text.secondary",
                                      fontWeight: "400",
                                    }}
                                  >
                                    <PeopleOutline fontSize="small" />
                                    <Typography variant="body2"> {usersCount} members</Typography>
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Stack gap={2} pt={1} alignItems="flex-end">
                              <Stack direction="row" gap={2} alignItems="center">
                                <CalendarMonthOutlined color="secondary" />
                                <Typography variant="h4" color="secondary" noWrap fontWeight="500">
                                  <LocalTime date={startAt} formatter={(d) => d.toLocaleDateString()} />
                                </Typography>
                              </Stack>
                              <Button
                                size="large"
                                color="secondary"
                                endIcon={<ArrowRightAltOutlined fontSize="large" />}
                                sx={{
                                  textWrap: "nowrap",
                                  width: "min-content",
                                }}
                              >
                                Zobacz wydarzenie
                              </Button>
                            </Stack>
                          </ListItem>
                        )
                      )}
                    </List>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination count={6} variant="text" shape="rounded" />
                  </CardActions>
                </Card>
                <Card
                  elevation={1}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardHeader
                    sx={{
                      padding: "18px 24px",
                      borderBottomWidth: "1px",
                      borderBottomStyle: "solid",
                      borderBottomColor: "divider",

                      "& > .MuiCardHeader-action": {
                        alignSelf: "center",
                        m: 0,
                      },
                    }}
                    title={<Typography variant="h5">Komentarze</Typography>}
                    action={
                      <Button variant="contained" startIcon={<AddOutlined />} onClick={() => alert("Not implemented.")}>
                        Dodaj komentarz
                      </Button>
                    }
                  />
                  <CardContent
                    sx={{
                      p: "0 0 24px",
                      maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <List disablePadding>
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                      {comment}
                    </List>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination count={6} variant="text" shape="rounded" />
                  </CardActions>
                </Card>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </Container>
    </>
  );
}
