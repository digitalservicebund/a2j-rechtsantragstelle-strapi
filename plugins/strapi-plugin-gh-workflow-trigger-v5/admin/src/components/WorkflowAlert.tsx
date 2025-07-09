import { Box } from '@strapi/design-system';
import { Alert } from '@strapi/design-system';

export type AlertVariant = 'success' | 'danger' | 'closed';

type AlertProps = {
  onClose: () => void;
  variant: AlertVariant;
  content: string;
  title: string;
};

export const WorkflowAlert = ({ content, ...props }: AlertProps) => (
  <Box zIndex={1000} position="fixed" width="80vw" marginLeft="10vw" marginTop="4">
    <Alert closeLabel="Close" {...props}>
      {content}
    </Alert>
  </Box>
);
