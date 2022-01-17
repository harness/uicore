/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { ExpressionInput, ExpressionInputProps } from './ExpressionInput'

export default {
  title: 'Components / ExpressionInput',
  component: ExpressionInput
} as Meta

export const Basic: Story<ExpressionInputProps> = args => {
  return (
    <div style={{ width: '600px' }}>
      <ExpressionInput {...args} />
    </div>
  )
}

Basic.args = {
  items: [
    'app.xyz.name',
    'app.xyz.description',
    'pipeline.name',
    'pipeline.description',
    'pipeline.identifier',
    'pipeline.var1',
    'pipeline.var2',
    'pipeline.var3',
    'pipeline.var4',
    'pipeline.var5',
    'pipeline.var6',
    'pipeline.var7',
    'pipeline.var8',
    'pipeline.var9',
    'pipeline.var10',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var11',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var12',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var13',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var14',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var15',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var16',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var17',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var18',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var19',
    'pipeline.stages.serviceDeploy.spec.serviceConfig.serviceDefinition.spec.manifests.file.var20',
    'pipeline.stage.qa.displayNameeqrfddsfweyudfrtyhsdfqsqwdxwdcwtrcfqwtdwcrwqhjdwvcqwhyjevcjwhtevcwqthercjhwvqerhwqtevrcwqhtevqwhtcevqwjhtrv qdwhjhydfuqjywfdrjhasyqfd'
  ],
  value: '<+se'
}
