import { Modal } from '@strapi/design-system';
import { Button } from '@strapi/design-system';
import { Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { Upload } from '@strapi/icons';

type TriggerButtonProps = {
  modelOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  disabled: boolean;
};

export const TriggerButton = ({
  modelOpen,
  disabled,
  onOpenChange,
  onConfirm,
}: TriggerButtonProps) => (
  <Flex gap={4} paddingTop={4} paddingBottom={4}>
    <Modal.Root open={modelOpen} onOpenChange={onOpenChange}>
      <Modal.Trigger>
        <Button startIcon={<Upload />} disabled={disabled}>
          Trigger workflow
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Publish new content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="delta">Do you want to trigger a new workflow?</Typography>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Cancel</Button>
          </Modal.Close>
          <Button startIcon={<Upload />} onClick={onConfirm} disabled={disabled}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  </Flex>
);
