import { jsxs, jsx } from "react/jsx-runtime";
import MessageBox from "./MessageBox-Br7hVpwI.js";
import { useToast, useColorModeValue, Flex, Img, Icon, Text, Spinner, SimpleGrid, Box, Textarea, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdPerson, MdAutoAwesome } from "react-icons/md";
import { useMutation } from "react-query";
import "../ssr.js";
import { C as Card } from "./Card-M0XrdzyB.js";
import { U as UserLayout } from "./index-D7V5_Wy3.js";
import SeoHeader from "./SeoHeader-DxzDf-f4.js";
import CustomCKEditor from "./CustomCKEditor-dDDE0_xj.js";
import axios from "axios";
import "react-markdown";
import "remark-breaks";
import "react-dom/server";
import "@inertiajs/inertia-react";
import "@inertiajs/react/server";
import "@chakra-ui/theme-tools";
import "react-icons/fa";
import "./SearchBar-Dsk0VtlP.js";
import "@chakra-ui/icons";
import "./statics-GI0iJz3l.js";
import "@inertiajs/react";
import "@chakra-ui/skeleton";
import "react-custom-scrollbars-2";
import "prop-types";
import "react-icons/io";
import "@inertiajs/inertia";
import "./use-request-CXEg0apC.js";
import "react-slick";
import "react-lazyload";
import "react-helmet";
/* empty css                   */
const Bg = "/build/assets/bg-chat-image-BXYRl0wU.png";
const sendMessageToChatBot = async (message) => {
  const res = await axios.post("/api/send-message-to-chat-bot", { message });
  return res;
};
function Chat({ content }) {
  const toast = useToast();
  const maxCodeLength = 500;
  const [inputOnSubmit, setInputOnSubmit] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "gray.500");
  const placeholderColor = useColorModeValue(
    { color: "gray.500" },
    { color: "whiteAlpha.600" }
  );
  const sendChatMutation = useMutation(sendMessageToChatBot, {
    onSuccess: async (response) => {
      const data = response.data;
      if (!data) {
        setLoading(false);
        toast({
          title: "No response data received.",
          position: "top-right",
          status: "warning",
          insert: "top",
          duration: 5e3,
          isClosable: true
        });
        return;
      }
      const answer = data.answer;
      const displayWithChunkEffect = async (text) => {
        let displayedText = "";
        for (const char of text) {
          displayedText += char;
          setOutputCode(displayedText);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      };
      await displayWithChunkEffect(answer);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      toast({
        title: "An error occurred while researhing. Please try again later.",
        position: "top-right",
        status: "error",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
    }
  });
  const handleChange = (event) => {
    setInputCode(event.target.value);
  };
  const handleTranslate = () => {
    setInputOnSubmit(inputCode);
    if (!inputCode) {
      toast({
        title: "Please enter your message.",
        position: "top-right",
        status: "warning",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
      return;
    }
    if (inputCode.length > maxCodeLength) {
      toast({
        title: `Please enter sentences less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
        position: "top-right",
        status: "warning",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
      return;
    }
    setLoading(true);
    setInputCode("");
    sendChatMutation.mutate(inputCode);
  };
  const [suggestedQuestions, setSuggestedQuestions] = useState(null);
  useEffect(() => {
    axios.get("/api/get-questions?random=4").then((res) => {
      setSuggestedQuestions(res.data.questions);
    });
  }, []);
  const handleClickQuestion = (question) => {
    setInputOnSubmit(question);
    if (!question) {
      toast({
        title: "Please enter your message.",
        position: "top-right",
        status: "warning",
        insert: "top",
        duration: 5e3,
        isClosable: true
      });
      return;
    }
    setLoading(true);
    setInputCode("");
    setSuggestedQuestions(null);
    sendChatMutation.mutate(question);
  };
  return /* @__PURE__ */ jsxs(UserLayout, { children: [
    /* @__PURE__ */ jsx(SeoHeader, { content, title: "Data Explorer" }),
    /* @__PURE__ */ jsx(CustomCKEditor, { content: content.content }),
    /* @__PURE__ */ jsxs(
      Flex,
      {
        w: "100%",
        direction: "column",
        position: "relative",
        children: [
          /* @__PURE__ */ jsx(
            Img,
            {
              src: Bg,
              position: "absolute",
              w: "350px",
              left: "50%",
              top: "50%",
              alt: "Chat Background",
              transform: "translate(-50%, -50%)"
            }
          ),
          /* @__PURE__ */ jsxs(
            Flex,
            {
              direction: "column",
              mx: "auto",
              w: { base: "100%", md: "100%", xl: "100%" },
              minH: { base: "75vh", "2xl": "85vh" },
              maxW: { base: "75vh", "2xl": "85vh" },
              border: "1px solid",
              borderColor,
              borderRadius: "lg",
              children: [
                /* @__PURE__ */ jsxs(
                  Flex,
                  {
                    direction: "column",
                    w: "100%",
                    ml: "20px",
                    display: "flex",
                    mb: "auto",
                    children: [
                      /* @__PURE__ */ jsxs(Flex, { w: "100%", align: "center", mb: "10px", display: outputCode ? "flex" : "none", children: [
                        /* @__PURE__ */ jsx(
                          Flex,
                          {
                            borderRadius: "full",
                            justify: "center",
                            align: "center",
                            bg: "transparent",
                            border: "1px solid",
                            borderColor,
                            me: "20px",
                            h: "40px",
                            minH: "40px",
                            minW: "40px",
                            zIndex: "2",
                            children: /* @__PURE__ */ jsx(
                              Icon,
                              {
                                as: MdPerson,
                                width: "20px",
                                height: "20px",
                                color: brandColor
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          Flex,
                          {
                            p: "22px",
                            border: "1px solid",
                            borderColor,
                            borderRadius: "14px",
                            w: { base: "75%", md: "85%" },
                            zIndex: "2",
                            children: /* @__PURE__ */ jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: /* @__PURE__ */ jsx(
                              Text,
                              {
                                color: textColor,
                                fontWeight: "600",
                                fontSize: { base: "sm", md: "md" },
                                lineHeight: { base: "24px", md: "26px" },
                                children: inputOnSubmit
                              }
                            ) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs(Flex, { w: "100%", children: [
                        /* @__PURE__ */ jsx(
                          Flex,
                          {
                            borderRadius: "full",
                            justify: "center",
                            align: "center",
                            bgGradient: "linear(to-r, #2ac349, #018cc1)",
                            me: "20px",
                            h: "40px",
                            minH: "40px",
                            minW: "40px",
                            display: outputCode ? "flex" : "none",
                            children: /* @__PURE__ */ jsx(
                              Icon,
                              {
                                as: MdAutoAwesome,
                                width: "20px",
                                height: "20px",
                                color: "white"
                              }
                            )
                          }
                        ),
                        !loading ? /* @__PURE__ */ jsx(MessageBox, { output: outputCode }) : /* @__PURE__ */ jsx(
                          Card,
                          {
                            px: "22px !important",
                            pl: "22px !important",
                            color: textColor,
                            w: { base: "75%", md: "85%" },
                            fontSize: { base: "sm", md: "md" },
                            lineHeight: { base: "24px", md: "26px" },
                            maxH: "100vh",
                            overflow: "auto",
                            fontWeight: "500",
                            sx: {
                              "&::-webkit-scrollbar": {
                                width: "8px",
                                height: "8px",
                                backgroundColor: "transparent"
                                // Change to transparent or the desired color
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: borderColor,
                                // Color for the scrollbar thumb
                                borderRadius: "20px"
                              },
                              "&::-webkit-scrollbar-track": {
                                backgroundColor: "rgba(0, 0, 0, 0.15)",
                                // Track color, adjust as needed
                                borderRadius: "20px"
                              }
                            },
                            children: /* @__PURE__ */ jsx(Spinner, {})
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(SimpleGrid, { columns: { lg: 4, md: 3, "2sm": 2, base: 1 }, spacing: 4, px: 2, children: suggestedQuestions && suggestedQuestions.map((question) => /* @__PURE__ */ jsx(
                  Text,
                  {
                    border: "1px solid",
                    borderColor,
                    borderRadius: "14px",
                    p: "10px",
                    cursor: "pointer",
                    onClick: () => handleClickQuestion(question.question),
                    position: "relative",
                    zIndex: 1e3,
                    children: question.question
                  },
                  question.id
                )) }),
                /* @__PURE__ */ jsx(Text, { textColor: secondaryText, textAlign: "center", children: "Sometimes I am not smart enough. I am still learning." }),
                /* @__PURE__ */ jsx(Box, { bottom: 0, width: "full", children: /* @__PURE__ */ jsxs(Flex, { mt: "20px", justifyContent: "center", alignItems: "center", children: [
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      minH: "54px",
                      border: "1px solid",
                      borderColor,
                      borderRadius: "45px",
                      p: "15px 20px",
                      me: "10px",
                      fontSize: "sm",
                      fontWeight: "500",
                      _focus: { borderColor: "none" },
                      color: inputColor,
                      _placeholder: placeholderColor,
                      placeholder: "Type your message here...",
                      value: inputCode,
                      onChange: handleChange,
                      sx: {
                        "&::-webkit-scrollbar": {
                          width: "8px",
                          height: "8px",
                          backgroundColor: "transparent"
                          // Change to transparent or the desired color
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: borderColor,
                          // Color for the scrollbar thumb
                          borderRadius: "20px"
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "rgba(0, 0, 0, 0.15)",
                          // Track color, adjust as needed
                          borderRadius: "20px"
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "primary",
                      py: "20px",
                      px: "16px",
                      fontSize: "sm",
                      borderRadius: "45px",
                      ms: "auto",
                      w: { base: "160px", md: "210px" },
                      bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
                      h: "54px",
                      _hover: {
                        boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
                        _disabled: {
                          bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
                        }
                      },
                      color: "white",
                      onClick: handleTranslate,
                      isLoading: loading ? true : false,
                      children: "Submit"
                    }
                  )
                ] }) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  Chat as default
};
