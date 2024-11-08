import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/inertia-react";
import createServer from "@inertiajs/react/server";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { mode, createBreakpoints } from "@chakra-ui/theme-tools";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const Card = {
  baseStyle: (props) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "20px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800")(props),
    boxShadow: mode(
      "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
      "unset"
    )(props),
    backgroundClip: "border-box"
  })
};
const CardComponent = {
  components: {
    Card
  }
};
const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        transition: ".25s all ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "none"
        },
        _active: {
          boxShadow: "none"
        }
      },
      variants: {
        outline: () => ({
          borderRadius: "16px"
        }),
        brand: (props) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.500", "brand.400")(props)
          },
          _active: {
            bg: mode("brand.500", "brand.400")(props)
          },
          _hover: {
            bg: mode("brand.600", "brand.400")(props)
          }
        }),
        darkBrand: (props) => ({
          bg: mode("brand.900", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.900", "brand.400")(props)
          },
          _active: {
            bg: mode("brand.900", "brand.400")(props)
          },
          _hover: {
            bg: mode("brand.800", "brand.400")(props)
          }
        }),
        lightBrand: (props) => ({
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("#F2EFFF", "whiteAlpha.100")(props)
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props)
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props)
          }
        }),
        light: (props) => ({
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props)
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props)
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props)
          }
        }),
        action: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "brand.400")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "brand.400")(props)
          },
          _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "brand.400")(props)
          }
        }),
        setup: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props)
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props)
          }
        })
      }
    }
  }
};
const badgeStyles = {
  components: {
    Badge: {
      baseStyle: {
        borderRadius: "10px",
        lineHeight: "100%",
        padding: "7px",
        paddingLeft: "12px",
        paddingRight: "12px"
      },
      variants: {
        outline: () => ({
          borderRadius: "16px"
        }),
        brand: (props) => ({
          bg: mode("brand.500", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.500", "brand.400")(props)
          },
          _active: {
            bg: mode("brand.500", "brand.400")(props)
          },
          _hover: {
            bg: mode("brand.600", "brand.400")(props)
          }
        })
      }
    }
  }
};
const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px"
        }
      },
      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" }
          }
        }),
        auth: (props) => ({
          field: {
            fontWeight: "500",
            color: mode("navy.700", "white")(props),
            bg: mode("transparent", "transparent")(props),
            border: "1px solid",
            borderColor: mode(
              "secondaryGray.100",
              "rgba(135, 140, 189, 0.3)"
            )(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600", fontWeight: "400" }
          }
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" }
          }
        })
      }
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400
        }
      },
      variants: {
        main: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" }
          }
        })
      }
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400
        }
      },
      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: "secondaryGray.600",
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          },
          icon: {
            color: "secondaryGray.600"
          }
        }),
        mini: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "0px solid transparent",
            fontSize: "0px",
            p: "10px",
            _placeholder: { color: "secondaryGray.600" }
          },
          icon: {
            color: "secondaryGray.600"
          }
        }),
        subtle: (props) => ({
          box: {
            width: "unset"
          },
          field: {
            bg: "transparent",
            border: "0px solid",
            color: "secondaryGray.600",
            borderColor: "transparent",
            width: "max-content",
            _placeholder: { color: "secondaryGray.600" }
          },
          icon: {
            color: "secondaryGray.600"
          }
        }),
        transparent: (props) => ({
          field: {
            bg: "transparent",
            border: "0px solid",
            width: "min-content",
            color: mode("secondaryGray.600", "secondaryGray.600")(props),
            borderColor: "transparent",
            padding: "0px",
            paddingLeft: "8px",
            paddingRight: "20px",
            fontWeight: "700",
            fontSize: "14px",
            _placeholder: { color: "secondaryGray.600" }
          },
          icon: {
            transform: "none !important",
            position: "unset !important",
            width: "unset",
            color: "secondaryGray.600",
            right: "0px"
          }
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" }
          }
        })
      }
    }
    // PinInputField: {
    //   variants: {
    //     main: (props) => ({
    //       field: {
    //         bg: "red !important",
    //         border: "1px solid",
    //         color: mode("secondaryGray.900", "white")(props),
    //         borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
    //         borderRadius: "16px",
    //         _placeholder: { color: "secondaryGray.600" },
    //       },
    //     }),
    //   },
    // },
  }
};
const progressStyles = {
  components: {
    Progress: {
      baseStyle: {
        field: {
          fontWeight: 400,
          w: "16px",
          h: "16px",
          borderRadius: "20px",
          _checked: { transform: "translate(20px, 0px)" }
        },
        track: {
          w: "40px",
          h: "20px",
          borderRadius: "20px",
          _focus: {
            boxShadow: "none"
          }
        }
      },
      variants: {
        table: (props) => ({
          field: {
            bg: "brand.500",
            borderRadius: "16px",
            fontSize: "sm"
          },
          track: {
            borderRadius: "20px",
            bg: mode("blue.50", "whiteAlpha.50")(props),
            h: "8px",
            w: "54px"
          },
          thumb: {
            w: "250px"
          }
        })
      }
    }
  }
};
const sliderStyles = {
  components: {
    RangeSlider: {
      // baseStyle: {
      //   thumb: {
      //     fontWeight: 400,
      //   },
      //   track: {
      //     display: "flex",
      //   },
      // },
      variants: {
        main: (props) => ({
          thumb: {
            bg: mode("brand.500", "brand.400")(props)
          }
        })
      }
    }
  }
};
const textareaStyles = {
  components: {
    Textarea: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px"
        }
      },
      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid !important",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" }
          }
        }),
        auth: (props) => ({
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        authSecondary: (props) => ({
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" }
          }
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" }
          }
        })
      }
    }
  }
};
const switchStyles = {
  components: {
    Switch: {
      baseStyle: {
        thumb: {
          fontWeight: 400,
          borderRadius: "50%",
          w: "16px",
          h: "16px",
          _checked: { transform: "translate(20px, 0px)" }
        },
        track: {
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          w: "40px",
          h: "20px",
          p: "2px",
          ps: "2px",
          _focus: {
            boxShadow: "none"
          }
        }
      },
      variants: {
        main: (props) => ({
          track: {
            bg: mode("gray.300", "navy.700")(props)
          }
        })
      }
    }
  }
};
const linkStyles = {
  components: {
    Link: {
      baseStyle: {
        textDecoration: "none",
        boxShadow: "none",
        _focus: {
          boxShadow: "none"
        },
        _active: {
          boxShadow: "none"
        },
        _hover: {
          textDecoration: "none",
          border: "none"
        }
      },
      _hover: {
        textDecoration: "none",
        border: "none"
      }
    }
  }
};
const breakpoints = createBreakpoints({
  sm: "320px",
  "2sm": "430px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1600px",
  "3xl": "1920px"
});
const globalStyles = {
  colors: {
    brand: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#11047A"
    },
    brandScheme: {
      100: "#E9E3FF",
      200: "#7551FF",
      300: "#7551FF",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A"
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A"
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559"
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A"
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF"
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547"
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574"
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437"
    },
    gray: {
      100: "#FAFCFE"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px"
      },
      input: {
        color: "gray.700"
      },
      html: {
        fontFamily: "DM Sans"
      }
    })
  }
};
const initialTheme = extendTheme(
  { breakpoints },
  // Breakpoints
  globalStyles,
  badgeStyles,
  // badge styles
  buttonStyles,
  // button styles
  linkStyles,
  // link styles
  progressStyles,
  // progress styles
  sliderStyles,
  // slider styles
  inputStyles,
  // input styles
  textareaStyles,
  // textarea styles
  switchStyles,
  // switch styles
  CardComponent
  // card component
);
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(void 0);
  const getUser = async () => {
    const response = await axios.get("/api/user");
    return response.data.user;
  };
  const { data: resUser } = useQuery("getUser", getUser, { staleTime: 3e5 });
  useEffect(() => {
    setUser(resUser);
  }, [resUser]);
  return /* @__PURE__ */ jsx(UserContext.Provider, { value: { user, setUser }, children });
};
const DBMSContext = createContext();
const DBMSContextProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [encyclopedias, setEncyclopedias] = useState([]);
  return /* @__PURE__ */ jsx(DBMSContext.Provider, { value: { vendors, setVendors, encyclopedias, setEncyclopedias }, children });
};
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const getFeaturedProducts = async () => {
  const { data } = await axios.get("/api/get-featured-products?published=1&type=sidebar");
  const res = await axios.get("/api/get-featured-products?published=1&type=top");
  return { side: data.featured_products, top: res.data.featured_products };
};
const FeaturedProductSidebarContext = createContext();
const FeaturedProductSidebarContextProvider = ({ children }) => {
  const { data: featuredProducts } = useQuery("featured_products", getFeaturedProducts, { staleTime: 3e5 });
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return /* @__PURE__ */ jsx(FeaturedProductSidebarContext.Provider, { value: {
    toggleSidebar,
    setToggleSidebar,
    featuredProducts
  }, children });
};
const queryClient = new QueryClient();
const appName = "DB Rank AI";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${appName} | ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}/index.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/NotFound/index.jsx": () => import("./assets/index-BduhdZpi.js"), "./Pages/admin/banner/components/BannerForm.jsx": () => import("./assets/BannerForm-Cxp4P6cn.js"), "./Pages/admin/banner/index.jsx": () => import("./assets/index-DiDKlfx1.js"), "./Pages/admin/blog/components/blogs/components/BlogForm.jsx": () => import("./assets/BlogForm-CmIAKaOl.js"), "./Pages/admin/blog/components/blogs/index.jsx": () => import("./assets/index-CYRe_FvX.js"), "./Pages/admin/blog/components/categories/components/CategoryModal.jsx": () => import("./assets/CategoryModal-DK7ZwDGD.js"), "./Pages/admin/blog/components/categories/index.jsx": () => import("./assets/index-DivdcM7u.js"), "./Pages/admin/blog/components/tags/components/TagModal.jsx": () => import("./assets/TagModal--KMnlXqx.js"), "./Pages/admin/blog/components/tags/index.jsx": () => import("./assets/index-B2Bv_HsS.js"), "./Pages/admin/blog/index.jsx": () => import("./assets/index-CmWFgjr4.js"), "./Pages/admin/dbms/Categories/components/CategoryModal.jsx": () => import("./assets/CategoryModal-CI2Gehv1.js"), "./Pages/admin/dbms/Categories/index.jsx": () => import("./assets/index-CKosJwo5.js"), "./Pages/admin/dbms/dbms/components/DBMSForm.jsx": () => import("./assets/DBMSForm-DPscc44w.js").then((n) => n.D), "./Pages/admin/dbms/dbms/index.jsx": () => import("./assets/DBMSForm-DPscc44w.js").then((n) => n.i), "./Pages/admin/dbms/index.jsx": () => import("./assets/index-Li9np30f.js"), "./Pages/admin/encyclopedia/components/EncyclopediaForm.jsx": () => import("./assets/EncyclopediaForm-Cf0nnKcV.js"), "./Pages/admin/encyclopedia/index.jsx": () => import("./assets/index-C06IsGJd.js"), "./Pages/admin/featured-products/index.jsx": () => import("./assets/index-CjX6ZYVq.js"), "./Pages/admin/featured-products/sidebar/components/FeaturedProductForm.jsx": () => import("./assets/FeaturedProductForm-DgETQoP1.js"), "./Pages/admin/featured-products/sidebar/index.jsx": () => import("./assets/index-CaQU2qrt.js"), "./Pages/admin/featured-products/top/components/FeaturedProductForm.jsx": () => import("./assets/FeaturedProductForm-CPJZLhYH.js"), "./Pages/admin/featured-products/top/index.jsx": () => import("./assets/index-BzBe6tVu.js"), "./Pages/admin/meta-data/components/Template.jsx": () => import("./assets/Template-B1igEyrc.js"), "./Pages/admin/meta-data/home/index.jsx": () => import("./assets/index-CsoSw6oL.js"), "./Pages/admin/meta-data/index.jsx": () => import("./assets/index-DWseWXJo.js"), "./Pages/admin/sponsors/components/SponsorForm.jsx": () => import("./assets/SponsorForm-BR8UxcKS.js"), "./Pages/admin/sponsors/index.jsx": () => import("./assets/index-B3PvZqr3.js"), "./Pages/admin/suggested-questions/components/QuestionModal.jsx": () => import("./assets/QuestionModal-Cy92J0FO.js"), "./Pages/admin/suggested-questions/index.jsx": () => import("./assets/index-DXHkX8SO.js"), "./Pages/admin/users/components/VendorForm.jsx": () => import("./assets/VendorForm-CYHznr5b.js"), "./Pages/admin/users/index.jsx": () => import("./assets/index-_P-e_Jjf.js"), "./Pages/auth/signIn/index.jsx": () => import("./assets/index-Ds8IJ8gz.js"), "./Pages/user/aboutus/index.jsx": () => import("./assets/index-DvAR0PUc.js"), "./Pages/user/blog/Blog/index.jsx": () => import("./assets/index-B-CE_uQt.js"), "./Pages/user/blog/CreateBlog/index.jsx": () => import("./assets/index-CWcZZrzP.js"), "./Pages/user/blog/Sidebar/Sidebar.jsx": () => import("./assets/Sidebar-BhRlx3Vl.js"), "./Pages/user/blog/Sidebar/components/Content.jsx": () => import("./assets/Content-C2L3CSaR.js"), "./Pages/user/blog/Sidebar/components/Links.jsx": () => import("./assets/Links-BkD9zm_x.js"), "./Pages/user/blog/index.jsx": () => import("./assets/index-BqeQR6Z4.js"), "./Pages/user/claim-dbms/index.jsx": () => import("./assets/index-DEyTC21M.js"), "./Pages/user/claim-dbms/request/use-request.jsx": () => import("./assets/use-request-DTvMmiIy.js"), "./Pages/user/components/CustomCKEditor.jsx": () => import("./assets/CustomCKEditor-dDDE0_xj.js"), "./Pages/user/components/SeoHeader.jsx": () => import("./assets/SeoHeader-DxzDf-f4.js"), "./Pages/user/contactus/index.jsx": () => import("./assets/index-COMMzjOq.js"), "./Pages/user/data-explorer/MessageBox.jsx": () => import("./assets/MessageBox-Br7hVpwI.js"), "./Pages/user/data-explorer/index.jsx": () => import("./assets/index-BI-EKW8W.js"), "./Pages/user/dbms/components/CompareDBMS/index.jsx": () => import("./assets/index-BMGd5JXR.js"), "./Pages/user/dbms/components/DBMS/index.jsx": () => import("./assets/index-DyeHhFvV.js"), "./Pages/user/dbms/index.jsx": () => import("./assets/index-CRJ-pDsJ.js"), "./Pages/user/encyclopedia/Encyclopedia/index.jsx": () => import("./assets/index-C6hHF_77.js"), "./Pages/user/encyclopedia/index.jsx": () => import("./assets/index-CheUeVmq.js"), "./Pages/user/home/components/RecentBlogs.jsx": () => import("./assets/RecentBlogs-C4I8xETR.js"), "./Pages/user/home/components/TopDBMSTable.jsx": () => import("./assets/TopDBMSTable-BybeUt4D.js"), "./Pages/user/home/index.jsx": () => import("./assets/index-ByiaLelh.js"), "./Pages/user/profile/index.jsx": () => import("./assets/index-BPHQCUj0.js"), "./Pages/user/ranking/component/RankCharts/index.jsx": () => import("./assets/index-CNR3fgOg.js"), "./Pages/user/ranking/component/RankTable/index.jsx": () => import("./assets/index-OH0jKulo.js"), "./Pages/user/ranking/component/Sidebar/Sidebar.jsx": () => import("./assets/Sidebar-BLgUQ7y6.js"), "./Pages/user/ranking/component/Sidebar/components/Content.jsx": () => import("./assets/Content-C88Gv5cb.js"), "./Pages/user/ranking/component/Sidebar/components/Links.jsx": () => import("./assets/Links-DfSt9t9W.js"), "./Pages/user/ranking/index.jsx": () => import("./assets/index-bxxg04gc.js"), "./Pages/user/services/index.jsx": () => import("./assets/index-DokSAvwP.js"), "./Pages/user/sponsor/index.jsx": () => import("./assets/index-Df6GCxq7.js") })),
    setup: ({ App, props }) => {
      return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(UserContextProvider, { children: /* @__PURE__ */ jsx(DBMSContextProvider, { children: /* @__PURE__ */ jsx(FeaturedProductSidebarContextProvider, { children: /* @__PURE__ */ jsx(ChakraProvider, { theme: initialTheme, children: /* @__PURE__ */ jsx(App, { ...props }) }) }) }) }) });
    }
  })
);
export {
  DBMSContext as D,
  FeaturedProductSidebarContext as F,
  UserContext as U
};
