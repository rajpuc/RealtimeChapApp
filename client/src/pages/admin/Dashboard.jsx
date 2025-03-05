import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search here" />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1}></Box>
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  const widgets = () => {};
  return (
    <AdminLayout>
      <Container component="main">
        {Appbar}
        <Stack>Chart Area</Stack>
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            padding="2rem 3.5rem"
            border-radius="1rem"
            width="100%"
            maxWidth="45rem"
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Messages
            </Typography>
            {"Chat"}
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            {" Dougnut Chart"}
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
            </Stack>
          </Paper>
        </Stack>
        {widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
