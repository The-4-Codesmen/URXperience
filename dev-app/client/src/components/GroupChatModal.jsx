import React from 'react'
import {useDisclosure, Button, Modal,
    ModalOverlay,ModalContent, ModalHeader,
    ModalCloseButton, ModalBody,ModalFooter,
    FormControl,FormLabel,Input  } from "@chakra-ui/react"
const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        maxW="960px" mx="auto"
      >
        <ModalOverlay />
        <ModalContent style={{ background:"red", marginTop:100, alignItems: "center", width:"50%",}}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={0}>
            <FormControl>
              <FormLabel  style={{textColor: "yellow"}}>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal