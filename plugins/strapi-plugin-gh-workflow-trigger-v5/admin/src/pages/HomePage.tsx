import { Box, Button, Main, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ArrowClockwise } from '@strapi/icons';
import { getFetchClient, Layouts } from '@strapi/strapi/admin';
import { getTranslation } from '../utils/getTranslation';
import { PLUGIN_ID } from '../pluginId';
import type { Workflow } from '../models/workflows';
import { WorkflowTable } from '../components/WorkflowTable';
import { Divider } from '@strapi/design-system';
import { AlertVariant, WorkflowAlert } from '../components/WorkflowAlert';
import { TriggerButton } from '../components/TriggerButtonModal';

const ALERT_CLOSE_TIMEOUT_MS = 5000;
const REFRESH_AFTER_TRIGGER_TIMEOUT_MS = 3000;

type listWorkflowsResponse = {
  total_count: number;
  workflow_runs: Workflow[];
};

const HomePage = () => {
  const { formatMessage } = useIntl();

  const [busy, setBusy] = useState(true);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const { get, post } = getFetchClient();

  const refresh = async () => {
    setBusy(true);
    get<listWorkflowsResponse>(`/${PLUGIN_ID}/listWorkflows`).then((res) => {
      setWorkflows(res.data.workflow_runs);
      setBusy(false);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const [modelOpen, setModelOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('closed');

  const trigger = () => {
    setBusy(true);
    post<{ success: boolean; error: unknown }>(`/${PLUGIN_ID}/trigger`).then(({ data }) => {
      const { success, error } = data;

      setAlertContent(
        success ? 'Success, refreshing workflow list...' : `A failure has occurred:\n ${error}`
      );
      setAlertVariant(success ? 'success' : 'danger');
      setModelOpen(false);
      setTimeout(() => refresh(), REFRESH_AFTER_TRIGGER_TIMEOUT_MS);
      setTimeout(() => setAlertVariant('closed'), ALERT_CLOSE_TIMEOUT_MS);
    });
  };

  // See https://design-system-git-main-strapijs.vercel.app/
  return (
    <Main>
      {alertVariant !== 'closed' && (
        <WorkflowAlert
          variant={alertVariant}
          content={alertContent}
          title="Workflow trigger"
          onClose={() => setAlertVariant('closed')}
        />
      )}
      <Layouts.Header
        title={formatMessage({
          id: getTranslation('home.title'),
          defaultMessage: 'Github Workflow Trigger',
        })}
        subtitle={formatMessage({
          id: getTranslation('home.description'),
          defaultMessage: 'Trigger workflows from your admin panel',
        })}
      />
      <Layouts.Content>
        <Flex gap={4} paddingBottom={4}>
          <TriggerButton
            modelOpen={modelOpen}
            disabled={busy}
            onOpenChange={setModelOpen}
            onConfirm={trigger}
          />

          <Button loading={busy} onClick={refresh} startIcon={<ArrowClockwise />}>
            Refresh
          </Button>
        </Flex>

        <WorkflowTable
          workflows={workflows}
          cancelOnClick={(cancel_url) => {
            post(`/${PLUGIN_ID}/cancel`, { cancel_url });
          }}
        />
      </Layouts.Content>
    </Main>
  );
};

export { HomePage };
