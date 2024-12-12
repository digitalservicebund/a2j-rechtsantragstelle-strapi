import { Badge } from '@strapi/design-system';
import { Check, Cross } from '@strapi/icons';
import type { Workflow } from 'src/models/workflows';

const backgroundColors = {
  success: 'success500',
  failure: 'danger500',
  cancelled: 'warning500',
};

const iconMap = {
  success: <Check />,
  failure: <Cross />,
  cancelled: <Cross />,
};

export const StatusBadge = (props: { conclusion: Workflow['conclusion'] }) => (
  <Badge backgroundColor={backgroundColors[props.conclusion]} textColor="neutral100">
    {props.conclusion} {iconMap[props.conclusion]}
  </Badge>
);
