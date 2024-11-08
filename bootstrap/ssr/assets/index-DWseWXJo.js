import { jsx, jsxs } from "react/jsx-runtime";
import { useColorModeValue, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { D as Dashboard } from "./index-BOOBh0R-.js";
import { useState } from "react";
import Template from "./Template-B1igEyrc.js";
import "prop-types";
import "@inertiajs/react";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "react-query";
import "../ssr.js";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "axios";
import "./statics-GI0iJz3l.js";
import "react-custom-scrollbars-2";
import "react-icons/io5";
import "react-icons/io";
import "react-icons/fa";
import "react-icons/md";
import "@inertiajs/inertia";
import "@ckeditor/ckeditor5-react";
import "ckeditor5";
/* empty css                   */
import "./Card-M0XrdzyB.js";
import "./CustomInput-D8rT110g.js";
import "./use-request-5uE4EmuI.js";
function MetaData() {
  const [page, setPage] = useState("home");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const handlePageChange = (newPage) => {
    if (page !== newPage) {
      setPage(newPage);
    }
  };
  return /* @__PURE__ */ jsx(Dashboard, { children: /* @__PURE__ */ jsx(Box, { pt: { base: "130px", md: "80px", xl: "80px" }, children: /* @__PURE__ */ jsxs(Tabs, { children: [
    /* @__PURE__ */ jsx(TabList, { children: /* @__PURE__ */ jsxs(
      Box,
      {
        overflowX: { base: "scroll", md: "auto" },
        overflowY: "hidden",
        display: "flex",
        maxW: "100%",
        sx: {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: borderColor,
            borderRadius: "20px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            borderRadius: "20px"
          }
        },
        children: [
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("home"), children: "Home" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("data-explorer"), children: "Data Explorer" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("dbms-ranking"), children: "DBMS Ranking" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("dbms"), children: "DBMS" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("encyclopedia"), children: "Encyclopedia" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("blog"), children: "Blog" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("sponsor"), children: "Sponsor" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("services"), children: "Service" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("aboutus"), children: "About Us" }),
          /* @__PURE__ */ jsx(Tab, { onClick: () => handlePageChange("contactus"), children: "Contact Us" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(TabPanels, { children: [
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "home" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "data-explorer" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "dbms-ranking" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "dbms" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "encyclopedia" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "blog" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "sponsor" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "services" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "aboutus" }) }),
      /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Template, { page: "contactus" }) })
    ] })
  ] }) }) });
}
export {
  MetaData as default
};
