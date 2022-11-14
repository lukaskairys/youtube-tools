import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
} from "@chakra-ui/react";

interface Props {
  showModalButtonText: string;
  modalHeader: string;
  modalBody: any;
}

const CustomModal = ({
  showModalButtonText,
  modalHeader,
  modalBody,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="blue" size="xs" onClick={onOpen} marginLeft={3}>
        {showModalButtonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
