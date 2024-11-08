import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast
} from '@chakra-ui/react'
import { useDisclosure, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios';

export default function QuestionModal({ _question, onopen, handleOnClose, handleOnUpdate }) {
  const toast = useToast();
  const { id, question } = _question;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [form, setForm] = useState({
    id,
    question
  })

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleQuestion = async () => {
    if (!form.id) {
      const res = await axios.post('/api/create-question', form);
      if (res.data.success) {
        onClose()
        clearForm();
        handleOnUpdate()
        toast({
          title: "You create new question successfully.",
          position: 'top-right',
          status: "success",
          insert: "top",
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: "Failed to create new question.",
          position: 'top-right',
          status: "error",
          insert: "top",
          duration: 5000,
          isClosable: true
        })
      }
    } else {
      const res = await axios.post(`/api/update-question?id=${form.id}`, form);
      if (res.data.success) {
        onClose()
        clearForm();
        handleOnUpdate()
        toast({
          title: "Update question successfully.",
          position: 'top-right',
          status: "success",
          insert: "top",
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: "Failed to update question.",
          position: 'top-right',
          status: "error",
          insert: "top",
          duration: 5000,
          isClosable: true
        })
      }
    }
  }

  useEffect(() => {
    if (onopen > 0) onOpen();
  }, [onopen, onOpen])

  useEffect(() => {
    setForm({ id, question });
  }, [question])

  const clearForm = () => {
    setForm({ id: null, question: '' })
  }

  const handleCloseModal = () => {
    onClose();
    clearForm();
    handleOnClose();
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{!question.id ? "Create" : "Update"} Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Question<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder="What's the best DBMS last month?"
                mb='24px'
                fontWeight='500'
                size='lg'
                name="question"
                value={form.question}
                onChange={handleChangeForm}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant={"brand"} mr={3} onClick={handleQuestion}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}