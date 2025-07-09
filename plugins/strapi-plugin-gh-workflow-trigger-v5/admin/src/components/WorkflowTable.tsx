import _ from 'lodash';
import { Cross } from '@strapi/icons';
import { IconButton } from '@strapi/design-system';
import { Link } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Typography } from '@strapi/design-system';
import type { Workflow } from '../models/workflows';
import { timeDifferenceString } from '../utils/time';
import { StatusBadge } from './StatusBadge';

type cancelOnClick = (cancel_url: string) => void;

type WorkflowTableProps = {
  workflows?: Workflow[];
  cancelOnClick: cancelOnClick;
};

const columns = [
  'run_number',
  'created_at',
  'author',
  'duration',
  'status',
  'conclusion',
  'run_attempt',
  'cancelOnClick',
  'html_url',
] as const;

type Columns = (typeof columns)[number];

const columnNames: Partial<Record<Columns, string>> = {
  html_url: 'Link',
  run_attempt: 'Attempt',
  conclusion: 'Outcome',
  created_at: 'Started',
  cancelOnClick: 'Cancel',
  run_number: 'Run',
};

const fieldTransforms: Partial<Record<Columns, (value: unknown) => JSX.Element>> = {
  html_url: (html_url) => (
    <Link isExternal href={html_url}>
      Github
    </Link>
  ),
  cancelOnClick: (cancelOnClick) => (
    <IconButton disabled={cancelOnClick === undefined} withTooltip={false} onClick={cancelOnClick}>
      <Cross />
    </IconButton>
  ),
  conclusion: (conclusion) => <StatusBadge conclusion={conclusion as Workflow['conclusion']} />,
};

export const WorkflowTable = ({ workflows, cancelOnClick }: WorkflowTableProps) => {
  if (!workflows) return null;
  const strippedWorkflows = workflows
    .map((workflow) => ({
      ...workflow,
      duration: timeDifferenceString(new Date(workflow.created_at), new Date(workflow.updated_at)),
      cancelOnClick:
        workflow.status !== 'completed' ? () => cancelOnClick(workflow.cancel_url) : undefined,
      author: workflow.actor.login,
    }))
    .map((workflow) => {
      return _.pick(workflow, ...columns);
    });

  return (
    <Table colCount={columns.length} rowCount={strippedWorkflows.length}>
      <Thead>
        <Tr>
          {columns.map((key) => (
            <Th key={key}>
              <Typography variant="sigma">{columnNames[key] ?? key}</Typography>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {strippedWorkflows.map((workflow) => (
          <Tr key={workflow.run_number}>
            {Object.entries(workflow).map(([key, value]) => (
              <Td key={key}>
                <Typography variant="sigma">
                  {fieldTransforms[key as Columns]?.(value) ?? value}
                </Typography>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
