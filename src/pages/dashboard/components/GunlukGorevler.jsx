import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";
import { notify } from "../../../utils/notify";
import { tasksData } from "../shared/dashboardEnums";

const GunlukGorevler = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  const { email } = userInfo;

  const navigate = useNavigate();

  const { colors } = useColors();

  const { request } = useApiRequest();

  const [newTasksData, setNewTasksData] = useState(tasksData);

  useEffect(() => {
    const getGorevler = async () => {
      try {
        const result = await request({
          url: "/quiz/daily-quota",
          method: "GET",
          params: { email },
        });

        if (result.success) {
          setNewTasksData((prev) => {
            const newTasksData = [...prev];
            const dailyTaskIndex = newTasksData.findIndex(
              (item) => item.title === "Günlük Görev"
            );
            if (dailyTaskIndex === -1) return prev;

            const dailyTask = newTasksData[dailyTaskIndex];
            const newTasks = dailyTask.tasks.map((task) => {
              if (task.includes("quiz")) {
                const remaining = result.data.remaining;
                const target = result.data.target;

                return `🧠 ${remaining} / ${target} quiz çözdün`;
              }
              return task;
            });

            newTasksData[dailyTaskIndex] = {
              ...dailyTask,
              tasks: newTasks,
            };

            return newTasksData;
          });
        } else {
          notify("Günlük görev alınamadı.", "error");
        }
      } catch (error) {
        notify(error, "error");
      }
    };

    getGorevler();
  }, [request, email]);

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mb: 6, mt: 5 }}>
      {/* Her görev kartını burada dönebilirsin, ben sadece Günlük Görev'i örnekledim */}
      {newTasksData.map(({ title, tasks, buttonText, route }) => (
        <Grid item xs={12} sm={6} md={4} key={title}>
          <Card
            elevation={3}
            sx={{
              p: 4,
              height: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              bgcolor: colors.secondaryLight,
              boxShadow: `0 6px 18px ${colors.secondary}1f`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 12px 28px ${colors.secondary}4d`,
                bgcolor: colors.secondaryLight + "dd",
              },
            }}
            onClick={() => navigate(route)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(route);
            }}
            aria-label={`${title} kartı, detaylar için tıklayın`}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color={colors.secondaryDark}
                mb={1.5}
                sx={{ userSelect: "none" }}
              >
                {title}
              </Typography>

              {tasks.map((task, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  color={colors.neutralDark}
                  sx={{ mb: 0.6 }}
                >
                  {task}
                </Typography>
              ))}
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(route);
                }}
                sx={{
                  bgcolor: colors.secondary,
                  color: "#fff",
                  fontWeight: "600",
                  "&:hover": {
                    bgcolor: colors.secondaryDark,
                  },
                  px: 3,
                  borderRadius: 2,
                  textTransform: "none",
                }}
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GunlukGorevler;
