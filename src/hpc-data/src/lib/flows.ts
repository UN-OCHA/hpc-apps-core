import * as t from 'io-ts';

import { REPORTING_WINDOW } from './reporting-windows';
import { resultWithPermissions, INTEGER_FROM_STRING } from './util';

export const FLOW = t.type({
  id: t.number,
  name: t.string,
});

export type Flow = t.TypeOf<typeof FLOW>;

export const FLOW_CLUSTER = t.type({
  id: t.number,
  abbreviation: t.string,
  name: t.string,
  permissions: t.type({
    canModifyAccess: t.boolean,
  }),
});

export type FlowCluster = t.TypeOf<typeof FLOW_CLUSTER>;

export const DETAILED_FLOW = t.intersection([
  FLOW,
  t.type({
    permissions: t.type({
      canModifyAccess: t.boolean,
    }),
  }),
]);

export type DetailedFlow = t.TypeOf<typeof DETAILED_FLOW>;

export const GET_FLOWS_RESULT = resultWithPermissions(
  t.array(FLOW),
  t.type({
    canAddFlow: t.boolean,
  })
);

export type GetFlowsResult = t.TypeOf<typeof GET_FLOWS_RESULT>;

export const GET_FLOW_PARAMS = t.type({
  id: INTEGER_FROM_STRING,
});

export type GetFlowParams = t.TypeOf<typeof GET_FLOW_PARAMS>;

export const GET_FLOW_RESULT = t.type({
  data: DETAILED_FLOW,
});

export type GetFlowResult = t.TypeOf<typeof GET_FLOW_RESULT>;

export interface Model {
  getFlows(): Promise<GetFlowsResult>;
  getFlow(params: GetFlowParams): Promise<GetFlowResult>;
}
