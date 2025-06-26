import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
} from "@mui/material";
import { useColors } from "../../../../context/ColorContext";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { levelIcons, levels } from "../shared/sozlukEnums";
import { notify } from "../../../../utils/notify";
import SearchBar from "../../../../components/form/formInputs/SearchBar";
import CustomButton from "../../../../components/customButton/CustomButton";

export default function CategorySidebar({ selectedCategories, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesByLevel, setCategoriesByLevel] = useState({});

  const { request } = useApiRequest();
  const { colors } = useColors();

  useEffect(() => {
    let isMounted = true;
    setCategoriesByLevel({});

    Promise.all(
      levels.map((level) =>
        request({ url: `/words/level/${level}` }).then((res) => {
          if (res.success) return { level, data: res.data };
          notify(res.error, "error");
          return { level, data: [] };
        })
      )
    )
      .then((results) => {
        if (!isMounted) return;

        const grouped = {};
        results.forEach(({ level, data }) => {
          grouped[level] = data;
        });
        setCategoriesByLevel(grouped);
      })
      .catch((err) => {
        if (!isMounted) return;
        notify(err.message || "Kategoriler yüklenirken hata oluştu", "error");
      });

    return () => {
      isMounted = false;
    };
  }, [request]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onSelect(selectedCategories.filter((c) => c !== category));
    } else {
      onSelect([...selectedCategories, category]);
    }
  };

  const lowerSearch = searchTerm.toLowerCase();

  return (
    <Box sx={{ width: "100%" }}>
      {/* Arama */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Kategori ara..."
        sx={{ mb: 2 }}
      />

      {/* Seçimleri Sıfırla Butonu */}
      {selectedCategories.length > 0 && (
        <Box sx={{ mb: 2, textAlign: "right" }}>
          <CustomButton
            onClick={() => onSelect([])}
            variant="outlined"
            text="Seçimleri Sıfırla"
            sx={{
              fontSize: "0.75rem",
              px: 1.5,
              py: 0.7,
              mt:2,
              color: colors.primaryDark,
              borderColor: colors.primaryDark,
              "&:hover": {
                bgcolor: colors.primaryLight,
                borderColor: colors.primaryDark,
                color: colors.primaryDark,
              },
            }}
          />
        </Box>
      )}

      {/* Kategori Listeleri */}
      {Object.entries(categoriesByLevel).map(([level, words]) => {
        if (!words) return null;

        const uniqueCategories = Array.from(
          new Set(words.map((w) => w.category))
        );

        const filtered = uniqueCategories.filter((cat) =>
          cat.toLowerCase().includes(lowerSearch)
        );

        if (filtered.length === 0) return null;

        return (
          <Box key={level} sx={{ mb: 3, mt: 1 }}>
            {/* Seviye Başlığı */}
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                color: colors.primaryDark,
                px: 2,
                py: 1,
                borderRadius: 2,
                mb: 1,
                background: `linear-gradient(120deg, ${colors.primaryLight}, ${colors.secondaryLight})`,
                boxShadow: `0 1px 4px ${colors.primaryLight}`,
                userSelect: "none",
                gap: 1,
                fontSize: "0.9rem",
              }}
            >
              <Box component="span" sx={{ fontSize: 22 }}>
                {levelIcons[level]}
              </Box>
              {level}
            </Typography>

            {/* Kategori Listesi */}
            <List
              dense
              disablePadding
              sx={{
                maxHeight: 395,
                overflowY: "auto",
                px: 1,
                borderRadius: 2,
                backgroundColor: colors.neutralLight,
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.04)",
                "&::-webkit-scrollbar": { width: 6 },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: colors.primaryDark,
                  borderRadius: 10,
                },
              }}
            >
              {filtered.map((cat) => {
                const selected = selectedCategories.includes(cat);

                return (
                  <ListItemButton
                    key={cat}
                    selected={selected}
                    onClick={() => toggleCategory(cat)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      px: 2,
                      py: 1,
                      transition: "all 0.25s ease",
                      backgroundColor: selected
                        ? colors.accent
                        : "transparent",
                      color: selected
                        ? colors.primaryDark
                        : colors.neutralDark,
                      fontWeight: selected ? 700 : 400,
                      fontSize: "0.9rem",
                      "&:hover": {
                        backgroundColor: colors.primaryLight,
                        color: colors.primaryDark,
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    {cat}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        );
      })}
    </Box>
  );
}
