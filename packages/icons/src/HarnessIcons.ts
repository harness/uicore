/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/**
 * This file is auto-generated. Please do not modify this file manually.
 * Use the command `yarn ui:icons` to regenerate this file.
 */
import { ElementType, lazy } from 'react'
import { KVO } from '@harness/design-system'

type HarnessIconName =
  | 'Account'
  | 'Anchore-inverse'
  | 'Anchore'
  | 'AquaTrivy-inverse'
  | 'AquaTrivy'
  | 'AuqaTrivy-inverse'
  | 'AuqaTrivy'
  | 'BlackDuck-inverse'
  | 'BlackDuck'
  | 'Burp-inverse'
  | 'Burp'
  | 'Checkmarx-inverse'
  | 'Checkmarx'
  | 'CustomDeployment'
  | 'Edit'
  | 'FreezeWindow'
  | 'Inline'
  | 'Options'
  | 'PrismaCloud-inverse'
  | 'PrismaCloud'
  | 'Qualys-inverse'
  | 'Qualys'
  | 'Snyk-inverse'
  | 'Snyk'
  | 'SonarQube-inverse'
  | 'SonarQube'
  | 'SplitView'
  | 'Stroke'
  | 'Tenable-inverse'
  | 'Tenable'
  | 'Veracode-inverse'
  | 'Veracode'
  | 'ZAP-inverse'
  | 'ZAP'
  | 'access-control'
  | 'accordion-collapsed'
  | 'accordion-expanded'
  | 'acr-ci-step-inverse'
  | 'acr-ci-step'
  | 'activity'
  | 'add-graph'
  | 'add-stage'
  | 'adminRole'
  | 'advanced'
  | 'agent-tokens'
  | 'agents'
  | 'ai'
  | 'anchore-grype-inverse'
  | 'anchore-grype'
  | 'api-docs'
  | 'app-aws-code-deploy'
  | 'app-aws-lambda'
  | 'app-kubernetes'
  | 'apply'
  | 'approval-stage-icon'
  | 'approval-stage'
  | 'approval-step'
  | 'aquasec-inverse'
  | 'aquasec'
  | 'argo'
  | 'arm'
  | 'arrow'
  | 'artifact-google-cloud-source-repo'
  | 'artifact-google-cloud-storage'
  | 'artifact-registry'
  | 'asg-blue-green-inverse'
  | 'asg-blue-green'
  | 'asg-canary-delete-inverse'
  | 'asg-canary-delete'
  | 'asg-canary-inverse'
  | 'asg-canary'
  | 'asg-deploy-inverse'
  | 'asg-deploy'
  | 'asg-phased-deploy'
  | 'asg-rollback'
  | 'asg-setup'
  | 'asg-swap-inverse'
  | 'asg-swap'
  | 'audit-log-created'
  | 'audit-trail'
  | 'autoScaler'
  | 'autostopping'
  | 'avatar'
  | 'aws-asg'
  | 'aws-codecommit'
  | 'aws-ectwo-service'
  | 'aws-kms'
  | 'aws-lambda-deploy'
  | 'aws-lambda-rollback'
  | 'aws-lambda-traffic-shift'
  | 'aws-rds'
  | 'aws-sam-build-inverse'
  | 'aws-sam-build'
  | 'aws-sam-deploy-inverse'
  | 'aws-sam-deploy'
  | 'aws-sam-package-inverse'
  | 'aws-sam-package'
  | 'aws-secret-manager'
  | 'aws-security-hub-inverse'
  | 'aws-security-hub'
  | 'azure-arm-rollback'
  | 'azure-arm'
  | 'azure-blob'
  | 'azure-blueprints'
  | 'azure-container-registry'
  | 'azure-devops'
  | 'azure-key-vault'
  | 'azure-kubernetes-service'
  | 'azure-resource-manager'
  | 'azure-vm'
  | 'azurewebapp'
  | 'background-ci-step-inverse'
  | 'background-ci-step'
  | 'background-step-plugin'
  | 'background-step'
  | 'backstage-api'
  | 'backstage-component'
  | 'backstage-domain'
  | 'backstage-logo'
  | 'backstage-resource'
  | 'backstage-system'
  | 'bandit-inverse'
  | 'bandit'
  | 'banned'
  | 'bar-chart'
  | 'barrier-close'
  | 'barrier-open-with-links'
  | 'barrier-open'
  | 'baseline-target'
  | 'basic-deployment'
  | 'bg-scale-down-step-inverse'
  | 'bg-scale-down-step'
  | 'bin-main'
  | 'bitbucket-blue'
  | 'bitbucket-new'
  | 'bitbucket-selected'
  | 'bitbucket-unselected'
  | 'bitbucket'
  | 'bitrise-plugin'
  | 'bitrise'
  | 'blank-canvas-card-icon'
  | 'blank-canvas-header-icon'
  | 'blue-black-cluster'
  | 'blue-green'
  | 'bluegreen-inverse'
  | 'bluegreen'
  | 'brakeman-inverse'
  | 'brakeman'
  | 'budget-alert-light'
  | 'build-stage'
  | 'burp-suite-inverse'
  | 'burp-suite'
  | 'calendar-page'
  | 'canary-delete-inverse'
  | 'canary-delete'
  | 'canary-grey'
  | 'canary-icon'
  | 'canary-inverse'
  | 'canary-outline'
  | 'canary'
  | 'cancel-alert'
  | 'canvas-position'
  | 'canvas-reset'
  | 'canvas-selector'
  | 'cascading'
  | 'ccm-cloud-integration-settings'
  | 'ccm-currency-settings'
  | 'ccm-nav-anomalies'
  | 'ccm-nav-asset-governance'
  | 'ccm-nav-autostopping-rules'
  | 'ccm-nav-bi-dashboards'
  | 'ccm-nav-budgets'
  | 'ccm-nav-cluster-orchestration'
  | 'ccm-nav-commitments'
  | 'ccm-nav-cost-categories'
  | 'ccm-nav-msp'
  | 'ccm-nav-perspectives'
  | 'ccm-nav-recommendations'
  | 'ccm-policy-details'
  | 'ccm-policy-shield-checked'
  | 'ccm-policy-shield'
  | 'ccm-sketch'
  | 'ccm-solid'
  | 'ccm-with-dark-text'
  | 'ccm-with-text'
  | 'cd-hover'
  | 'cd-main-inverse'
  | 'cd-main'
  | 'cd-sketch'
  | 'cd-solid'
  | 'cd-with-dark-text'
  | 'cd-with-text'
  | 'cd'
  | 'cde'
  | 'cdk-bootstrap-inverse'
  | 'cdk-bootstrap'
  | 'cdk-deploy-inverse'
  | 'cdk-deploy'
  | 'cdk-destroy-inverse'
  | 'cdk-destroy'
  | 'cdk-diff-inverse'
  | 'cdk-diff'
  | 'cdk-inverse'
  | 'cdk-roll-back-inverse'
  | 'cdk-roll-back'
  | 'cdk-synth-inverse'
  | 'cdk-synth'
  | 'cdk'
  | 'ce-application'
  | 'ce-beta'
  | 'ce-budget_colored'
  | 'ce-budget_grey'
  | 'ce-cloud'
  | 'ce-cluster'
  | 'ce-hover'
  | 'ce-main-colored'
  | 'ce-main-grey'
  | 'ce-main-inverse'
  | 'ce-main'
  | 'ce-optimization'
  | 'ce-visibility-plus'
  | 'ce-visibility'
  | 'cet-agent-tokens-settings'
  | 'cet-agents-settings'
  | 'cet-critical-events-settings'
  | 'cet-grey'
  | 'cet-inverse'
  | 'cet-quality-gate'
  | 'cet-with-dark-text'
  | 'cet-with-text'
  | 'cet'
  | 'cf-hover'
  | 'cf-main-inverse'
  | 'cf-main'
  | 'cf-nav-featureFlags'
  | 'chained-pipeline-hover'
  | 'chained-pipeline'
  | 'change-log'
  | 'changes'
  | 'chaos-cube'
  | 'chaos-experiment-weight'
  | 'chaos-hubs'
  | 'chaos-litmuschaos'
  | 'chaos-main'
  | 'chaos-namespace'
  | 'chaos-nav-chaosguard'
  | 'chaos-nav-chaoshub'
  | 'chaos-nav-experiments'
  | 'chaos-nav-gamedays'
  | 'chaos-nav-network-maps'
  | 'chaos-nav-resilience-probes'
  | 'chaos-scenario-builder-faded'
  | 'chaos-scenario-builder'
  | 'chaos-service-discovery'
  | 'chaos-sketch'
  | 'chaos-solid'
  | 'chaos-with-dark-text'
  | 'chaos-with-text'
  | 'chat'
  | 'check-alt'
  | 'check'
  | 'checkov'
  | 'ci-active-build'
  | 'ci-build-pipeline'
  | 'ci-dev-exp'
  | 'ci-execution'
  | 'ci-gov'
  | 'ci-hover'
  | 'ci-infra-support'
  | 'ci-infra'
  | 'ci-integrated'
  | 'ci-language'
  | 'ci-main-inverse'
  | 'ci-main'
  | 'ci-parameterization'
  | 'ci-pending-build'
  | 'ci-sketch'
  | 'ci-solid-current-color'
  | 'ci-solid'
  | 'ci-test-step'
  | 'ci-ti'
  | 'ci-try-pipeline'
  | 'ci-with-dark-text'
  | 'ci-with-text'
  | 'circle-cross'
  | 'circle-pipeline-rollback'
  | 'circle-stop'
  | 'clipboard-alt'
  | 'cloud-accounts'
  | 'cloud-dark'
  | 'cloud-formation-create'
  | 'cloud-formation-delete'
  | 'cloud-formation-rollback'
  | 'cloud-foundry'
  | 'cloud-function-no-traffic-shift'
  | 'cloud-function-rollback'
  | 'cloud-function-traffic-shift'
  | 'cloud-light'
  | 'cloud-sso'
  | 'cloudformation'
  | 'clusterEffieiencyScore'
  | 'cmd-probe'
  | 'code-ascending'
  | 'code-branch-small'
  | 'code-branch'
  | 'code-chat'
  | 'code-clone'
  | 'code-close'
  | 'code-closed'
  | 'code-commit-light'
  | 'code-commit-small'
  | 'code-commit'
  | 'code-content'
  | 'code-copy'
  | 'code-delete'
  | 'code-descending'
  | 'code-draft'
  | 'code-edit'
  | 'code-file-light'
  | 'code-file'
  | 'code-folder'
  | 'code-gear'
  | 'code-history'
  | 'code-info'
  | 'code-merged'
  | 'code-more'
  | 'code-open'
  | 'code-pull-request'
  | 'code-pull'
  | 'code-quote'
  | 'code-rejected'
  | 'code-repo'
  | 'code-settings'
  | 'code-tag'
  | 'code-webhook'
  | 'code'
  | 'codebase-invalid'
  | 'codebase-not-configured'
  | 'codebase-valid'
  | 'codebase-validating'
  | 'codebase-zero-state'
  | 'command-approval'
  | 'command-artifact-check'
  | 'command-barrier'
  | 'command-calendar'
  | 'command-echo'
  | 'command-email'
  | 'command-http'
  | 'command-icon'
  | 'command-install'
  | 'command-resource-constraint'
  | 'command-rollback'
  | 'command-shell-script'
  | 'command-start'
  | 'command-stop'
  | 'command-swap'
  | 'command-switch'
  | 'command-winrm'
  | 'compare-version'
  | 'conditional-execution'
  | 'conditional-filled'
  | 'conditional-skip-filled'
  | 'conditional-skip-new'
  | 'conditional-skip'
  | 'conditional-when'
  | 'config-change'
  | 'config-file'
  | 'configure'
  | 'confluence'
  | 'connectivity-mode'
  | 'connectors-blue'
  | 'connectors-icon'
  | 'connectthroughdelegate'
  | 'connectthroughmanager'
  | 'contact-support'
  | 'container'
  | 'cookiecutter'
  | 'copy-alt'
  | 'copy-doc'
  | 'copy'
  | 'cost-change'
  | 'cost-data-collection'
  | 'coverage-status-error'
  | 'coverage-status-success'
  | 'coverity'
  | 'create-pr'
  | 'create-via-existing-yaml'
  | 'create-via-pipeline-template'
  | 'create-via-starter-pipeline'
  | 'critical-events'
  | 'cs-hover'
  | 'currency-banner'
  | 'custom-approval'
  | 'custom-artifact'
  | 'custom-ingest'
  | 'custom-plugin'
  | 'custom-remote-manifest'
  | 'custom-scan'
  | 'custom-service'
  | 'custom-sm'
  | 'custom-stage-icon'
  | 'custom-stage'
  | 'customRole'
  | 'customize'
  | 'cv-hover'
  | 'cv-main-inverse'
  | 'cv-main'
  | 'cv-sketch'
  | 'cv-solid-current-color'
  | 'cv-solid'
  | 'cv-verifystep-inverse'
  | 'cv-verifystep'
  | 'cv-with-text'
  | 'danger-icon'
  | 'dashboard-selected'
  | 'dashboard'
  | 'dashboards-solid-border'
  | 'data-fetch-error'
  | 'db-devops'
  | 'db-schema'
  | 'default-dashboard'
  | 'delegates-blue'
  | 'delegates-icon'
  | 'dependency-ci-step-inverse'
  | 'dependency-ci-step'
  | 'dependency-default-icon'
  | 'dependency-step'
  | 'deploy-cloud-function'
  | 'deploy-stage'
  | 'deployment-aborted-legacy'
  | 'deployment-aborted-new'
  | 'deployment-failed-legacy'
  | 'deployment-failed-new'
  | 'deployment-incomplete-legacy'
  | 'deployment-incomplete-new'
  | 'deployment-inprogress-legacy'
  | 'deployment-inprogress-new'
  | 'deployment-paused-legacy'
  | 'deployment-paused-new'
  | 'deployment-queued-legacy'
  | 'deployment-queued-new'
  | 'deployment-rejected-legacy'
  | 'deployment-rejected-new'
  | 'deployment-success-legacy'
  | 'deployment-success-new'
  | 'deployment-timeout-legacy'
  | 'deployment-timeout-new'
  | 'description'
  | 'digital-ocean'
  | 'docker-ci-step-inverse'
  | 'docker-ci-step'
  | 'docker-content-trust-inverse'
  | 'docker-content-trust'
  | 'docker-grey'
  | 'docker-hub-step'
  | 'docker-step-inverse'
  | 'docker-step'
  | 'docs'
  | 'dotnet'
  | 'down'
  | 'download-aws-s3-store'
  | 'download-box'
  | 'download-harness-store'
  | 'download-manifests-inverse'
  | 'download-manifests'
  | 'dry-run'
  | 'ecr-ci-step-inverse'
  | 'ecr-ci-step'
  | 'ecr-step-inverse'
  | 'ecr-step'
  | 'ecs-service-setup-inverse'
  | 'ecs-service-setup'
  | 'ecs-upgrade-containers-inverse'
  | 'ecs-upgrade-containers'
  | 'eema-dark'
  | 'eema-light'
  | 'eks-inverse'
  | 'eks'
  | 'elastic-kubernetes-service'
  | 'elastigroup-bluegreen-inverse'
  | 'elastigroup-bluegreen'
  | 'elastigroup-canary'
  | 'elastigroup-canarydelete'
  | 'elastigroup-deploy-inverse'
  | 'elastigroup-deploy'
  | 'elastigroup-inverse'
  | 'elastigroup-setup-inverse'
  | 'elastigroup-setup'
  | 'elastigroup-swap-inverse'
  | 'elastigroup-swap'
  | 'elastigroup'
  | 'elk'
  | 'email-inline'
  | 'email-step'
  | 'entity'
  | 'environment-group-outline'
  | 'environment-group'
  | 'environment'
  | 'environments-outline'
  | 'environments'
  | 'error-outline'
  | 'error-tracking'
  | 'error-transparent-no-outline'
  | 'evaluate-policy'
  | 'execution-abort'
  | 'execution-completed'
  | 'execution-conditional'
  | 'execution-destroy-strategy'
  | 'execution-destroy'
  | 'execution-error'
  | 'execution-history'
  | 'execution-input'
  | 'execution-issue'
  | 'execution-paused'
  | 'execution-provision-strategy'
  | 'execution-provision'
  | 'execution-rollback'
  | 'execution-running'
  | 'execution-stopped'
  | 'execution-success'
  | 'execution-timeout'
  | 'execution-waiting'
  | 'execution-warning'
  | 'execution'
  | 'expired'
  | 'explode'
  | 'expression-input'
  | 'failure-strategy'
  | 'fat-arrow-up'
  | 'feature-flag-stage'
  | 'feedback-given'
  | 'ff-sketch'
  | 'ff-solid'
  | 'ff-with-dark-text'
  | 'ff-with-text'
  | 'file'
  | 'filestore'
  | 'firehydrant'
  | 'fixed-input'
  | 'flag-tick'
  | 'flag'
  | 'flash'
  | 'flux'
  | 'folder-upload'
  | 'folder'
  | 'fortify-on-demand-inverse'
  | 'fortify-on-demand'
  | 'fossa-inverse'
  | 'fossa'
  | 'fs-closed-folder'
  | 'fs-open-folder'
  | 'fs-root-folder'
  | 'full-screen-exit'
  | 'full-screen'
  | 'functions'
  | 'gar-step-inverse'
  | 'gar-step'
  | 'gcp-engine'
  | 'gcp-kms'
  | 'gcp-secret-manager'
  | 'gcp'
  | 'gcr-ci-step-inverse'
  | 'gcr-ci-step'
  | 'gcr-step-inverse'
  | 'gcr-step'
  | 'gcs-ci-step-inverse'
  | 'gcs-ci-step'
  | 'gcs-step-inverse'
  | 'gcs-step'
  | 'gear'
  | 'generic-repository-type'
  | 'get-started'
  | 'git-branch-existing'
  | 'git-clone-ci-step-inverse'
  | 'git-clone-ci-step'
  | 'git-clone-step'
  | 'git-configure'
  | 'git-experience-setting'
  | 'git-landing-page'
  | 'git-new-branch'
  | 'git-popover'
  | 'github-action-plugin'
  | 'github-actions'
  | 'github-insights'
  | 'github-selected'
  | 'github-unselected'
  | 'github'
  | 'gitlab-selected'
  | 'gitlab-unselected'
  | 'gitlab'
  | 'gitleaks'
  | 'gitness-no-repositories'
  | 'gitops-agent-blue'
  | 'gitops-agent'
  | 'gitops-agents-blue-circle'
  | 'gitops-application-white'
  | 'gitops-application'
  | 'gitops-applications-blue-circle'
  | 'gitops-blue-circle'
  | 'gitops-blue'
  | 'gitops-clusters-blue-circle'
  | 'gitops-clusters-blue'
  | 'gitops-clusters'
  | 'gitops-gnupg-key-blue-circle'
  | 'gitops-gnupg-key-blue'
  | 'gitops-green'
  | 'gitops-missing'
  | 'gitops-no'
  | 'gitops-repo-cert-blue'
  | 'gitops-repository-blue-circle'
  | 'gitops-repository-blue'
  | 'gitops-repository-certificates-blue-circle'
  | 'gitops-suspended'
  | 'gitops-unknown'
  | 'gitops-yes'
  | 'gitops'
  | 'gitspaces'
  | 'golang'
  | 'google-kubernetes-engine'
  | 'google'
  | 'governance-policy-set'
  | 'governance-shield'
  | 'governance'
  | 'gradle-repository-type'
  | 'grafana'
  | 'graph-increase'
  | 'graph'
  | 'grey-cluster'
  | 'grid'
  | 'hand-manual'
  | 'harness-copilot'
  | 'harness-grey'
  | 'harness-logo-black'
  | 'harness-logo-white-bg-blue'
  | 'harness-logo-white'
  | 'harness-plugin'
  | 'harness-with-color'
  | 'harness'
  | 'hashiCorpVault'
  | 'health'
  | 'helm-oci'
  | 'helm-rollback'
  | 'help'
  | 'hexagon-outline'
  | 'hotfix'
  | 'hourglass'
  | 'http-probe'
  | 'http-step'
  | 'iacm-blue'
  | 'iacm-grey'
  | 'iacm-opentofu-inverse-step'
  | 'iacm-opentofu-step'
  | 'iacm-resource-added'
  | 'iacm-resource-changed'
  | 'iacm-resource-deleted'
  | 'iacm-resource-unchanged'
  | 'iacm-terraform-step'
  | 'iacm'
  | 'idp-nav-allowlist'
  | 'idp-nav-connectors'
  | 'idp-nav-layout'
  | 'idp-nav-oauth'
  | 'idp-nav-pluginconfig'
  | 'idp-nav-plugins'
  | 'idp-nav-scorecards'
  | 'idp-stage-hover'
  | 'idp-with-dark-text'
  | 'idp'
  | 'ignore-failed-square'
  | 'ignore-list'
  | 'ignoreFailed'
  | 'image-app-layer'
  | 'image-base-layer'
  | 'image-distro-layer'
  | 'incidents'
  | 'infinityTrend'
  | 'info-message'
  | 'info-messaging'
  | 'info'
  | 'infrastructure'
  | 'initialize-ci-step-inverse'
  | 'initialize-ci-step'
  | 'initialize-step-inverse'
  | 'initialize-step'
  | 'insight-view'
  | 'instances'
  | 'integration'
  | 'iro-logo-outline'
  | 'iro-main'
  | 'java'
  | 'jira-approve-inverse'
  | 'jira-approve'
  | 'jira-create-inverse'
  | 'jira-create'
  | 'jira-update-inverse'
  | 'jira-update'
  | 'k8s-patch'
  | 'k8s-traffic-routing'
  | 'key-main'
  | 'key'
  | 'kubernetes-gitops'
  | 'kubernetes-harness'
  | 'kustamize'
  | 'kustomizeparam'
  | 'launch'
  | 'layers-outline'
  | 'layout-bottom'
  | 'layout-float'
  | 'layout-right'
  | 'library'
  | 'line-chart'
  | 'linkedin'
  | 'list-blue'
  | 'list-entity-infographic'
  | 'list-vars'
  | 'list-view'
  | 'loading'
  | 'looping'
  | 'main-abort'
  | 'main-account-notifications'
  | 'main-add'
  | 'main-applications'
  | 'main-apply'
  | 'main-baseline'
  | 'main-calendar'
  | 'main-canary'
  | 'main-caret-down'
  | 'main-caret-left'
  | 'main-caret-right'
  | 'main-caret-up'
  | 'main-changelog'
  | 'main-chevron-down'
  | 'main-chevron-left'
  | 'main-chevron-right'
  | 'main-chevron-up'
  | 'main-clone'
  | 'main-close'
  | 'main-cloud-providers'
  | 'main-cloud'
  | 'main-code-yaml'
  | 'main-dashboard'
  | 'main-delegates'
  | 'main-delete'
  | 'main-depricate'
  | 'main-destroy'
  | 'main-download'
  | 'main-email'
  | 'main-environments'
  | 'main-feedback'
  | 'main-filter'
  | 'main-flag'
  | 'main-folder-new'
  | 'main-folder-open'
  | 'main-folder'
  | 'main-fullscreen'
  | 'main-help'
  | 'main-info'
  | 'main-infrastructure-provisioners'
  | 'main-issue-filled'
  | 'main-issue'
  | 'main-like'
  | 'main-link'
  | 'main-list'
  | 'main-listener-update'
  | 'main-lock'
  | 'main-main-zoom_in'
  | 'main-maximize'
  | 'main-minimize'
  | 'main-more'
  | 'main-move'
  | 'main-notes'
  | 'main-notifications'
  | 'main-pause'
  | 'main-pin'
  | 'main-pipelines'
  | 'main-popularity'
  | 'main-refresh'
  | 'main-reorder'
  | 'main-rerun'
  | 'main-resume'
  | 'main-rollback'
  | 'main-saved'
  | 'main-scope'
  | 'main-search'
  | 'main-service-ami'
  | 'main-services'
  | 'main-setup'
  | 'main-share'
  | 'main-sort'
  | 'main-start'
  | 'main-tags'
  | 'main-template-library'
  | 'main-thumbsdown'
  | 'main-thumbsup'
  | 'main-tick'
  | 'main-trash'
  | 'main-unlock'
  | 'main-unpin'
  | 'main-upload'
  | 'main-user-groups'
  | 'main-user'
  | 'main-view'
  | 'main-workflows'
  | 'main-zoom-out'
  | 'mark-as-failed'
  | 'mark-as-failure-inverse'
  | 'mark-as-failure'
  | 'maven-repository-type'
  | 'memberRole'
  | 'mend-inverse'
  | 'mend'
  | 'merge-pr'
  | 'metasploit-inverse'
  | 'metasploit'
  | 'microsoft-azure'
  | 'money-icon'
  | 'monitored-service'
  | 'multi-service'
  | 'nav-account-admin-hover'
  | 'nav-account-admin-selected'
  | 'nav-account-admin'
  | 'nav-builds'
  | 'nav-cd-hover'
  | 'nav-cd-selected'
  | 'nav-cd'
  | 'nav-cf'
  | 'nav-cv-hover'
  | 'nav-cv-selected'
  | 'nav-cv'
  | 'nav-dashboard-hover'
  | 'nav-dashboard-selected'
  | 'nav-dashboard'
  | 'nav-deployments-hover'
  | 'nav-deployments-selected'
  | 'nav-deployments'
  | 'nav-environments'
  | 'nav-git-sync'
  | 'nav-governance-hover'
  | 'nav-governance-selected'
  | 'nav-governance'
  | 'nav-harness-hover'
  | 'nav-harness-selected'
  | 'nav-harness'
  | 'nav-help'
  | 'nav-home'
  | 'nav-infrastructure-hover'
  | 'nav-infrastructure-selected'
  | 'nav-organization'
  | 'nav-pipeline'
  | 'nav-pipelines-selected'
  | 'nav-pipelines'
  | 'nav-project'
  | 'nav-resources-hover'
  | 'nav-resources-selected'
  | 'nav-resources'
  | 'nav-settings'
  | 'nav-support'
  | 'nav-user-profile-hover'
  | 'nav-user-profile-selected'
  | 'nav-user-profile'
  | 'nav-workspaces'
  | 'network'
  | 'new-artifact'
  | 'new-decoration'
  | 'new-notification'
  | 'ng-filter'
  | 'nikto-inverse'
  | 'nikto'
  | 'nine-dot-options'
  | 'nmap-inverse'
  | 'nmap'
  | 'no-deployments'
  | 'no-feedback-given'
  | 'no-instances'
  | 'nodejs'
  | 'not-synced'
  | 'notification'
  | 'npm-repository-type'
  | 'npm'
  | 'nuget-repository-type'
  | 'offline-outline'
  | 'oidc-authentication'
  | 'onprem-dark'
  | 'onprem-light'
  | 'openTofu'
  | 'openshift-params'
  | 'openshift'
  | 'opsgenie'
  | 'options-hollow'
  | 'osv-inverse'
  | 'osv'
  | 'other-workload'
  | 'owasp-dependency-check-inverse'
  | 'owasp-inverse'
  | 'owasp'
  | 'pager-duty'
  | 'pdc-inverse'
  | 'pdc'
  | 'pending'
  | 'pipeline-advanced'
  | 'pipeline-approval'
  | 'pipeline-build-select'
  | 'pipeline-build'
  | 'pipeline-custom'
  | 'pipeline-deploy'
  | 'pipeline-deployment'
  | 'pipeline-executor'
  | 'pipeline-ng'
  | 'pipeline-outputs'
  | 'pipeline-stage-selection-caret'
  | 'pipeline-variables'
  | 'pipeline'
  | 'placeholder-hover'
  | 'placeholder-selected'
  | 'placeholder'
  | 'play-circle'
  | 'play-outline'
  | 'plugin-ci-step-inverse'
  | 'plugin-ci-step'
  | 'plugin-inputs'
  | 'plugin-step'
  | 'pod-withbg'
  | 'pod'
  | 'policies'
  | 'policysets'
  | 'polygon'
  | 'probe-EOT'
  | 'probe-SOT'
  | 'probe-continuos'
  | 'probe-edge'
  | 'probe-onChaos'
  | 'profile'
  | 'progress-dial'
  | 'projects-wizard'
  | 'prowler-inverse'
  | 'prowler'
  | 'prune-skipped'
  | 'pruned'
  | 'publish-step'
  | 'pull-request'
  | 'python'
  | 'question'
  | 'queue-step'
  | 'queued'
  | 'rafay'
  | 'rancher-inverse'
  | 'rancher'
  | 're-executed'
  | 'reg-ex'
  | 'register-catalog'
  | 'remote-setup'
  | 'remote'
  | 'remotefile'
  | 'remove-graph'
  | 'remove-minus'
  | 'remove'
  | 'report-gear-grey'
  | 'report-gear'
  | 'report-icon'
  | 'repository'
  | 'res-connectors'
  | 'res-delegates'
  | 'res-environments'
  | 'res-resourceGroups'
  | 'res-roles'
  | 'res-secrets'
  | 'res-userGroups'
  | 'res-users'
  | 'reset-icon'
  | 'resource-center-community-icon'
  | 'resource-center-docs-icon'
  | 'resource-stack-destroy'
  | 'resource-stack-provision'
  | 'resource-stack'
  | 'resources-icon'
  | 'resources'
  | 'restore-cache-gcs-ci-step-inverse'
  | 'restore-cache-gcs-ci-step'
  | 'restore-cache-gcs-step-inverse'
  | 'restore-cache-gcs-step'
  | 'restore-cache-gcs'
  | 'restore-cache-harness-ci-step-inverse'
  | 'restore-cache-harness-ci-step'
  | 'restore-cache-s3-ci-step-inverse'
  | 'restore-cache-s3-ci-step'
  | 'restore-cache-s3-step-inverse'
  | 'restore-cache-s3-step'
  | 'restore-cache-s3'
  | 'restore-cache-step'
  | 'retry-step-group'
  | 'right-arrow'
  | 'right-bar-notification'
  | 'right-drawer'
  | 'roles'
  | 'rollback-execution'
  | 'rollback-pipeline-inverse'
  | 'rollback-pipeline'
  | 'rollback-service'
  | 'rollback-stage-inverse'
  | 'rollback-stage'
  | 'rolling-inverse'
  | 'rolling-update'
  | 'rolling'
  | 'rootly'
  | 'run-ci-step-inverse'
  | 'run-ci-step'
  | 'run-pipeline'
  | 'run-step-plugin'
  | 'run-step'
  | 'run-task-step'
  | 'run-test-step-plugin'
  | 'run-tests-ci-step-inverse'
  | 'run-tests-ci-step'
  | 'run-tests-step'
  | 'running-filled'
  | 'runtime-input'
  | 's3-ci-step-inverse'
  | 's3-ci-step'
  | 's3-step-inverse'
  | 's3-step'
  | 'sack-dollar'
  | 'save-cache-gcs-ci-step-inverse'
  | 'save-cache-gcs-ci-step'
  | 'save-cache-gcs-step-inverse'
  | 'save-cache-gcs-step'
  | 'save-cache-gcs'
  | 'save-cache-harness-ci-step-inverse'
  | 'save-cache-harness-ci-step'
  | 'save-cache-s3-ci-step-inverse'
  | 'save-cache-s3-ci-step'
  | 'save-cache-s3-step-inverse'
  | 'save-cache-s3-step'
  | 'save-cache-s3'
  | 'save-cache-step'
  | 'sbom-drift-detected'
  | 'scm'
  | 'script'
  | 'search-applications'
  | 'search-connectors'
  | 'search-environments'
  | 'search-infra-prov'
  | 'search-list'
  | 'search-pipelines'
  | 'search-services'
  | 'search-tips'
  | 'search-triggers'
  | 'search-user-groups'
  | 'search-users'
  | 'search-workflow'
  | 'secret-manager'
  | 'secret-ssh'
  | 'secrets-blue'
  | 'secrets-icon'
  | 'security-ci-step-inverse'
  | 'security-ci-step'
  | 'security-stage'
  | 'sei-main'
  | 'sei-with-dark-text'
  | 'select-scope'
  | 'semgrep'
  | 'send-data'
  | 'serverless-aws-lambda-deploy-v2-inverse'
  | 'serverless-aws-lambda-deploy-v2'
  | 'serverless-aws-lambda-package-inverse'
  | 'serverless-aws-lambda-package'
  | 'serverless-aws-lambda-prepare-rollback-inverse'
  | 'serverless-aws-lambda-prepare-rollback'
  | 'serverless-aws-lambda-rollback-v2-inverse'
  | 'serverless-aws-lambda-rollback-v2'
  | 'serverless-deploy-step'
  | 'service-accounts'
  | 'service-amazon-ecs'
  | 'service-ami'
  | 'service-ansible'
  | 'service-appdynamics'
  | 'service-artifactory-ci-step-inverse'
  | 'service-artifactory-ci-step'
  | 'service-artifactory-inverse'
  | 'service-artifactory'
  | 'service-aws-ccm'
  | 'service-aws-code-deploy'
  | 'service-aws-lamda'
  | 'service-aws-native-lambda'
  | 'service-aws-sam'
  | 'service-aws'
  | 'service-azdevops'
  | 'service-azure-artifact-connector'
  | 'service-azure-artifacts'
  | 'service-azure-ccm'
  | 'service-azure-functions'
  | 'service-azure'
  | 'service-bamboo'
  | 'service-bugsnag'
  | 'service-cdk'
  | 'service-circleci'
  | 'service-cloudformation'
  | 'service-cloudwatch'
  | 'service-custom-connector'
  | 'service-datadog'
  | 'service-deployment'
  | 'service-dockerhub'
  | 'service-dynatrace'
  | 'service-ec2'
  | 'service-ecs'
  | 'service-elastigroup'
  | 'service-elk'
  | 'service-gar'
  | 'service-gcp-ccm'
  | 'service-gcp-with-text'
  | 'service-gcp'
  | 'service-github-package'
  | 'service-github'
  | 'service-google-functions'
  | 'service-gotlab'
  | 'service-grafana-loki'
  | 'service-helm'
  | 'service-instana'
  | 'service-jenkins-inverse'
  | 'service-jenkins'
  | 'service-jira-inverse'
  | 'service-jira'
  | 'service-kubernetes-ccm'
  | 'service-kubernetes-quick'
  | 'service-kubernetes'
  | 'service-linux'
  | 'service-microsoft-teams'
  | 'service-mongodb'
  | 'service-msteams'
  | 'service-mydatacenter'
  | 'service-newrelic'
  | 'service-nexus'
  | 'service-ogz'
  | 'service-okta'
  | 'service-onelogin'
  | 'service-openstack'
  | 'service-pagerduty'
  | 'service-pivotal'
  | 'service-prometheus'
  | 'service-pulumi'
  | 'service-redis'
  | 'service-serverless-aws'
  | 'service-serverless-azure'
  | 'service-serverless-gcp'
  | 'service-serverless'
  | 'service-service-s3'
  | 'service-servicenow-inverse'
  | 'service-servicenow'
  | 'service-signalfx'
  | 'service-slack'
  | 'service-splunk-with-name'
  | 'service-splunk'
  | 'service-spotinst'
  | 'service-stackdriver'
  | 'service-sumologic'
  | 'service-terraform'
  | 'service-terragrunt'
  | 'service-vm'
  | 'service-vmware'
  | 'service-windows'
  | 'service'
  | 'servicenow-approve-inverse'
  | 'servicenow-approve'
  | 'servicenow-create-inverse'
  | 'servicenow-create'
  | 'servicenow-update-inverse'
  | 'servicenow-update'
  | 'services'
  | 'setting'
  | 'setup-api'
  | 'setup-client'
  | 'setup-tags'
  | 'shield-gears'
  | 'simple-verification'
  | 'skipped'
  | 'slider-trigger'
  | 'slo-downtime'
  | 'slo'
  | 'slot-deployment'
  | 'slsa-generation'
  | 'slsa-verification'
  | 'slsa'
  | 'smtp-configuration-blue'
  | 'smtp'
  | 'solid-error'
  | 'spinner'
  | 'spot-inverse'
  | 'spot'
  | 'srm-with-dark-text'
  | 'ssca-artifacts'
  | 'ssca-components'
  | 'ssca-enforce'
  | 'ssca-main'
  | 'ssca-orchestrate'
  | 'ssca-remediation'
  | 'ssl-cert'
  | 'stale-cache'
  | 'star-empty'
  | 'star'
  | 'stars'
  | 'status-pending'
  | 'status-running'
  | 'status-upgrade'
  | 'step-flash'
  | 'step-group'
  | 'step-jira'
  | 'step-kubernetes'
  | 'steps-spinner'
  | 'sto-color-filled'
  | 'sto-containers'
  | 'sto-dast'
  | 'sto-grey'
  | 'sto-sast'
  | 'sto-sca'
  | 'sto-secrets'
  | 'sto-with-dark-text'
  | 'sto-with-text'
  | 'store-artifact-bundle'
  | 'subscriptions'
  | 'success-tick'
  | 'support-account'
  | 'support-api'
  | 'support-code'
  | 'support-dashboard'
  | 'support-deployment'
  | 'support-gitops'
  | 'support-onprem'
  | 'support-pipeline'
  | 'support-security'
  | 'support-start'
  | 'support-tour'
  | 'support-troubleshoot'
  | 'support-verification'
  | 'support-videos'
  | 'swap-services'
  | 'switch-off'
  | 'switch-on'
  | 'sync-failed'
  | 'synced'
  | 'syncing'
  | 'sysdig'
  | 'tanzuCommand'
  | 'target-management'
  | 'target'
  | 'tas-inverse'
  | 'tas-manifest'
  | 'tas-pre-processing-artifact-group'
  | 'tas-pre-processing-artifact'
  | 'tas'
  | 'tasAppResize'
  | 'tasBGSetup'
  | 'tasBasicSetup'
  | 'tasCanarySetup'
  | 'tasMapRoute'
  | 'tasRollback'
  | 'tasRollingSetup'
  | 'tasSwapRollback'
  | 'tasSwapRoute'
  | 'tasUnMapRoute'
  | 'template-inputs'
  | 'template-library'
  | 'templates-blue'
  | 'templates-icon'
  | 'terminal'
  | 'terraform-apply-inverse'
  | 'terraform-apply-new'
  | 'terraform-apply'
  | 'terraform-cloud-rollback-inverse'
  | 'terraform-cloud-rollback'
  | 'terraform-cloud-run-inverse'
  | 'terraform-cloud-run'
  | 'terraform-cloud'
  | 'terraform-complicance'
  | 'terraform-destroy-inverse'
  | 'terraform-destroy'
  | 'terraform-plan-inverse'
  | 'terraform-plan'
  | 'terraform-rollback-inverse'
  | 'terraform-rollback'
  | 'terragrunt-apply-inverse'
  | 'terragrunt-apply'
  | 'terragrunt-destroy-inverse'
  | 'terragrunt-destroy'
  | 'terragrunt-plan-inverse'
  | 'terragrunt-plan'
  | 'terragrunt-rollback-inverse'
  | 'terragrunt-rollback'
  | 'test-connection'
  | 'test-verification'
  | 'text'
  | 'tfsec'
  | 'thinner-code-repos'
  | 'thinner-code-webhook'
  | 'thinner-search'
  | 'ti-callgraph'
  | 'timeout'
  | 'timer'
  | 'todo-list-harness'
  | 'todo'
  | 'tooltip-icon'
  | 'traffic-lights'
  | 'trigger-artifact'
  | 'trigger-execution'
  | 'trigger-github'
  | 'trigger-pipeline'
  | 'trigger-schedule'
  | 'trigger-stack'
  | 'union'
  | 'university'
  | 'up'
  | 'update-app'
  | 'upgrade-bolt'
  | 'upload-box'
  | 'upstream-proxies-icon'
  | 'user-groups'
  | 'user'
  | 'utility'
  | 'valuesFIle'
  | 'variable'
  | 'variables-blue'
  | 'variables'
  | 'view-json'
  | 'viewerRole'
  | 'waiting'
  | 'warning-icon'
  | 'warning-outline'
  | 'webhook'
  | 'white-cluster'
  | 'white-full-cluster'
  | 'wiggly-arrow'
  | 'wiz'
  | 'x'
  | 'yaml-builder-env'
  | 'yaml-builder-input-sets'
  | 'yaml-builder-notifications'
  | 'yaml-builder-stages'
  | 'yaml-builder-steps'
  | 'yaml-builder-trigger'
  | 'zoom-in'
  | 'zoom-out'

const HarnessIcons: KVO<ElementType> = {
  Account: lazy(() => import('./Account.svg')),
  'Anchore-inverse': lazy(() => import('./Anchore-inverse.svg')),
  Anchore: lazy(() => import('./Anchore.svg')),
  'AquaTrivy-inverse': lazy(() => import('./AquaTrivy-inverse.svg')),
  AquaTrivy: lazy(() => import('./AquaTrivy.svg')),
  'AuqaTrivy-inverse': lazy(() => import('./AuqaTrivy-inverse.svg')),
  AuqaTrivy: lazy(() => import('./AuqaTrivy.svg')),
  'BlackDuck-inverse': lazy(() => import('./BlackDuck-inverse.svg')),
  BlackDuck: lazy(() => import('./BlackDuck.svg')),
  'Burp-inverse': lazy(() => import('./Burp-inverse.svg')),
  Burp: lazy(() => import('./Burp.svg')),
  'Checkmarx-inverse': lazy(() => import('./Checkmarx-inverse.svg')),
  Checkmarx: lazy(() => import('./Checkmarx.svg')),
  CustomDeployment: lazy(() => import('./CustomDeployment.svg')),
  Edit: lazy(() => import('./Edit.svg')),
  FreezeWindow: lazy(() => import('./FreezeWindow.svg')),
  Inline: lazy(() => import('./Inline.svg')),
  Options: lazy(() => import('./Options.svg')),
  'PrismaCloud-inverse': lazy(() => import('./PrismaCloud-inverse.svg')),
  PrismaCloud: lazy(() => import('./PrismaCloud.svg')),
  'Qualys-inverse': lazy(() => import('./Qualys-inverse.svg')),
  Qualys: lazy(() => import('./Qualys.svg')),
  'Snyk-inverse': lazy(() => import('./Snyk-inverse.svg')),
  Snyk: lazy(() => import('./Snyk.svg')),
  'SonarQube-inverse': lazy(() => import('./SonarQube-inverse.svg')),
  SonarQube: lazy(() => import('./SonarQube.svg')),
  SplitView: lazy(() => import('./SplitView.svg')),
  Stroke: lazy(() => import('./Stroke.svg')),
  'Tenable-inverse': lazy(() => import('./Tenable-inverse.svg')),
  Tenable: lazy(() => import('./Tenable.svg')),
  'Veracode-inverse': lazy(() => import('./Veracode-inverse.svg')),
  Veracode: lazy(() => import('./Veracode.svg')),
  'ZAP-inverse': lazy(() => import('./ZAP-inverse.svg')),
  ZAP: lazy(() => import('./ZAP.svg')),
  'access-control': lazy(() => import('./access-control.svg')),
  'accordion-collapsed': lazy(() => import('./accordion-collapsed.svg')),
  'accordion-expanded': lazy(() => import('./accordion-expanded.svg')),
  'acr-ci-step-inverse': lazy(() => import('./acr-ci-step-inverse.svg')),
  'acr-ci-step': lazy(() => import('./acr-ci-step.svg')),
  activity: lazy(() => import('./activity.svg')),
  'add-graph': lazy(() => import('./add-graph.svg')),
  'add-stage': lazy(() => import('./add-stage.svg')),
  adminRole: lazy(() => import('./adminRole.svg')),
  advanced: lazy(() => import('./advanced.svg')),
  'agent-tokens': lazy(() => import('./agent-tokens.svg')),
  agents: lazy(() => import('./agents.svg')),
  ai: lazy(() => import('./ai.svg')),
  'anchore-grype-inverse': lazy(() => import('./anchore-grype-inverse.svg')),
  'anchore-grype': lazy(() => import('./anchore-grype.svg')),
  'api-docs': lazy(() => import('./api-docs.svg')),
  'app-aws-code-deploy': lazy(() => import('./app-aws-code-deploy.svg')),
  'app-aws-lambda': lazy(() => import('./app-aws-lambda.svg')),
  'app-kubernetes': lazy(() => import('./app-kubernetes.svg')),
  apply: lazy(() => import('./apply.svg')),
  'approval-stage-icon': lazy(() => import('./approval-stage-icon.svg')),
  'approval-stage': lazy(() => import('./approval-stage.svg')),
  'approval-step': lazy(() => import('./approval-step.svg')),
  'aquasec-inverse': lazy(() => import('./aquasec-inverse.svg')),
  aquasec: lazy(() => import('./aquasec.svg')),
  argo: lazy(() => import('./argo.svg')),
  arm: lazy(() => import('./arm.svg')),
  arrow: lazy(() => import('./arrow.svg')),
  'artifact-google-cloud-source-repo': lazy(() => import('./artifact-google-cloud-source-repo.svg')),
  'artifact-google-cloud-storage': lazy(() => import('./artifact-google-cloud-storage.svg')),
  'artifact-registry': lazy(() => import('./artifact-registry.svg')),
  'asg-blue-green-inverse': lazy(() => import('./asg-blue-green-inverse.svg')),
  'asg-blue-green': lazy(() => import('./asg-blue-green.svg')),
  'asg-canary-delete-inverse': lazy(() => import('./asg-canary-delete-inverse.svg')),
  'asg-canary-delete': lazy(() => import('./asg-canary-delete.svg')),
  'asg-canary-inverse': lazy(() => import('./asg-canary-inverse.svg')),
  'asg-canary': lazy(() => import('./asg-canary.svg')),
  'asg-deploy-inverse': lazy(() => import('./asg-deploy-inverse.svg')),
  'asg-deploy': lazy(() => import('./asg-deploy.svg')),
  'asg-phased-deploy': lazy(() => import('./asg-phased-deploy.svg')),
  'asg-rollback': lazy(() => import('./asg-rollback.svg')),
  'asg-setup': lazy(() => import('./asg-setup.svg')),
  'asg-swap-inverse': lazy(() => import('./asg-swap-inverse.svg')),
  'asg-swap': lazy(() => import('./asg-swap.svg')),
  'audit-log-created': lazy(() => import('./audit-log-created.svg')),
  'audit-trail': lazy(() => import('./audit-trail.svg')),
  autoScaler: lazy(() => import('./autoScaler.svg')),
  autostopping: lazy(() => import('./autostopping.svg')),
  avatar: lazy(() => import('./avatar.svg')),
  'aws-asg': lazy(() => import('./aws-asg.svg')),
  'aws-codecommit': lazy(() => import('./aws-codecommit.svg')),
  'aws-ectwo-service': lazy(() => import('./aws-ectwo-service.svg')),
  'aws-kms': lazy(() => import('./aws-kms.svg')),
  'aws-lambda-deploy': lazy(() => import('./aws-lambda-deploy.svg')),
  'aws-lambda-rollback': lazy(() => import('./aws-lambda-rollback.svg')),
  'aws-lambda-traffic-shift': lazy(() => import('./aws-lambda-traffic-shift.svg')),
  'aws-rds': lazy(() => import('./aws-rds.svg')),
  'aws-sam-build-inverse': lazy(() => import('./aws-sam-build-inverse.svg')),
  'aws-sam-build': lazy(() => import('./aws-sam-build.svg')),
  'aws-sam-deploy-inverse': lazy(() => import('./aws-sam-deploy-inverse.svg')),
  'aws-sam-deploy': lazy(() => import('./aws-sam-deploy.svg')),
  'aws-sam-package-inverse': lazy(() => import('./aws-sam-package-inverse.svg')),
  'aws-sam-package': lazy(() => import('./aws-sam-package.svg')),
  'aws-secret-manager': lazy(() => import('./aws-secret-manager.svg')),
  'aws-security-hub-inverse': lazy(() => import('./aws-security-hub-inverse.svg')),
  'aws-security-hub': lazy(() => import('./aws-security-hub.svg')),
  'azure-arm-rollback': lazy(() => import('./azure-arm-rollback.svg')),
  'azure-arm': lazy(() => import('./azure-arm.svg')),
  'azure-blob': lazy(() => import('./azure-blob.svg')),
  'azure-blueprints': lazy(() => import('./azure-blueprints.svg')),
  'azure-container-registry': lazy(() => import('./azure-container-registry.svg')),
  'azure-devops': lazy(() => import('./azure-devops.svg')),
  'azure-key-vault': lazy(() => import('./azure-key-vault.svg')),
  'azure-kubernetes-service': lazy(() => import('./azure-kubernetes-service.svg')),
  'azure-resource-manager': lazy(() => import('./azure-resource-manager.svg')),
  'azure-vm': lazy(() => import('./azure-vm.svg')),
  azurewebapp: lazy(() => import('./azurewebapp.svg')),
  'background-ci-step-inverse': lazy(() => import('./background-ci-step-inverse.svg')),
  'background-ci-step': lazy(() => import('./background-ci-step.svg')),
  'background-step-plugin': lazy(() => import('./background-step-plugin.svg')),
  'background-step': lazy(() => import('./background-step.svg')),
  'backstage-api': lazy(() => import('./backstage-api.svg')),
  'backstage-component': lazy(() => import('./backstage-component.svg')),
  'backstage-domain': lazy(() => import('./backstage-domain.svg')),
  'backstage-logo': lazy(() => import('./backstage-logo.svg')),
  'backstage-resource': lazy(() => import('./backstage-resource.svg')),
  'backstage-system': lazy(() => import('./backstage-system.svg')),
  'bandit-inverse': lazy(() => import('./bandit-inverse.svg')),
  bandit: lazy(() => import('./bandit.svg')),
  banned: lazy(() => import('./banned.svg')),
  'bar-chart': lazy(() => import('./bar-chart.svg')),
  'barrier-close': lazy(() => import('./barrier-close.svg')),
  'barrier-open-with-links': lazy(() => import('./barrier-open-with-links.svg')),
  'barrier-open': lazy(() => import('./barrier-open.svg')),
  'baseline-target': lazy(() => import('./baseline-target.svg')),
  'basic-deployment': lazy(() => import('./basic-deployment.svg')),
  'bg-scale-down-step-inverse': lazy(() => import('./bg-scale-down-step-inverse.svg')),
  'bg-scale-down-step': lazy(() => import('./bg-scale-down-step.svg')),
  'bin-main': lazy(() => import('./bin-main.svg')),
  'bitbucket-blue': lazy(() => import('./bitbucket-blue.svg')),
  'bitbucket-new': lazy(() => import('./bitbucket-new.svg')),
  'bitbucket-selected': lazy(() => import('./bitbucket-selected.svg')),
  'bitbucket-unselected': lazy(() => import('./bitbucket-unselected.svg')),
  bitbucket: lazy(() => import('./bitbucket.svg')),
  'bitrise-plugin': lazy(() => import('./bitrise-plugin.svg')),
  bitrise: lazy(() => import('./bitrise.svg')),
  'blank-canvas-card-icon': lazy(() => import('./blank-canvas-card-icon.svg')),
  'blank-canvas-header-icon': lazy(() => import('./blank-canvas-header-icon.svg')),
  'blue-black-cluster': lazy(() => import('./blue-black-cluster.svg')),
  'blue-green': lazy(() => import('./blue-green.svg')),
  'bluegreen-inverse': lazy(() => import('./bluegreen-inverse.svg')),
  bluegreen: lazy(() => import('./bluegreen.svg')),
  'brakeman-inverse': lazy(() => import('./brakeman-inverse.svg')),
  brakeman: lazy(() => import('./brakeman.svg')),
  'budget-alert-light': lazy(() => import('./budget-alert-light.svg')),
  'build-stage': lazy(() => import('./build-stage.svg')),
  'burp-suite-inverse': lazy(() => import('./burp-suite-inverse.svg')),
  'burp-suite': lazy(() => import('./burp-suite.svg')),
  'calendar-page': lazy(() => import('./calendar-page.svg')),
  'canary-delete-inverse': lazy(() => import('./canary-delete-inverse.svg')),
  'canary-delete': lazy(() => import('./canary-delete.svg')),
  'canary-grey': lazy(() => import('./canary-grey.svg')),
  'canary-icon': lazy(() => import('./canary-icon.svg')),
  'canary-inverse': lazy(() => import('./canary-inverse.svg')),
  'canary-outline': lazy(() => import('./canary-outline.svg')),
  canary: lazy(() => import('./canary.svg')),
  'cancel-alert': lazy(() => import('./cancel-alert.svg')),
  'canvas-position': lazy(() => import('./canvas-position.svg')),
  'canvas-reset': lazy(() => import('./canvas-reset.svg')),
  'canvas-selector': lazy(() => import('./canvas-selector.svg')),
  cascading: lazy(() => import('./cascading.svg')),
  'ccm-cloud-integration-settings': lazy(() => import('./ccm-cloud-integration-settings.svg')),
  'ccm-currency-settings': lazy(() => import('./ccm-currency-settings.svg')),
  'ccm-nav-anomalies': lazy(() => import('./ccm-nav-anomalies.svg')),
  'ccm-nav-asset-governance': lazy(() => import('./ccm-nav-asset-governance.svg')),
  'ccm-nav-autostopping-rules': lazy(() => import('./ccm-nav-autostopping-rules.svg')),
  'ccm-nav-bi-dashboards': lazy(() => import('./ccm-nav-bi-dashboards.svg')),
  'ccm-nav-budgets': lazy(() => import('./ccm-nav-budgets.svg')),
  'ccm-nav-cluster-orchestration': lazy(() => import('./ccm-nav-cluster-orchestration.svg')),
  'ccm-nav-commitments': lazy(() => import('./ccm-nav-commitments.svg')),
  'ccm-nav-cost-categories': lazy(() => import('./ccm-nav-cost-categories.svg')),
  'ccm-nav-msp': lazy(() => import('./ccm-nav-msp.svg')),
  'ccm-nav-perspectives': lazy(() => import('./ccm-nav-perspectives.svg')),
  'ccm-nav-recommendations': lazy(() => import('./ccm-nav-recommendations.svg')),
  'ccm-policy-details': lazy(() => import('./ccm-policy-details.svg')),
  'ccm-policy-shield-checked': lazy(() => import('./ccm-policy-shield-checked.svg')),
  'ccm-policy-shield': lazy(() => import('./ccm-policy-shield.svg')),
  'ccm-sketch': lazy(() => import('./ccm-sketch.svg')),
  'ccm-solid': lazy(() => import('./ccm-solid.svg')),
  'ccm-with-dark-text': lazy(() => import('./ccm-with-dark-text.svg')),
  'ccm-with-text': lazy(() => import('./ccm-with-text.svg')),
  'cd-hover': lazy(() => import('./cd-hover.svg')),
  'cd-main-inverse': lazy(() => import('./cd-main-inverse.svg')),
  'cd-main': lazy(() => import('./cd-main.svg')),
  'cd-sketch': lazy(() => import('./cd-sketch.svg')),
  'cd-solid': lazy(() => import('./cd-solid.svg')),
  'cd-with-dark-text': lazy(() => import('./cd-with-dark-text.svg')),
  'cd-with-text': lazy(() => import('./cd-with-text.svg')),
  cd: lazy(() => import('./cd.svg')),
  cde: lazy(() => import('./cde.svg')),
  'cdk-bootstrap-inverse': lazy(() => import('./cdk-bootstrap-inverse.svg')),
  'cdk-bootstrap': lazy(() => import('./cdk-bootstrap.svg')),
  'cdk-deploy-inverse': lazy(() => import('./cdk-deploy-inverse.svg')),
  'cdk-deploy': lazy(() => import('./cdk-deploy.svg')),
  'cdk-destroy-inverse': lazy(() => import('./cdk-destroy-inverse.svg')),
  'cdk-destroy': lazy(() => import('./cdk-destroy.svg')),
  'cdk-diff-inverse': lazy(() => import('./cdk-diff-inverse.svg')),
  'cdk-diff': lazy(() => import('./cdk-diff.svg')),
  'cdk-inverse': lazy(() => import('./cdk-inverse.svg')),
  'cdk-roll-back-inverse': lazy(() => import('./cdk-roll-back-inverse.svg')),
  'cdk-roll-back': lazy(() => import('./cdk-roll-back.svg')),
  'cdk-synth-inverse': lazy(() => import('./cdk-synth-inverse.svg')),
  'cdk-synth': lazy(() => import('./cdk-synth.svg')),
  cdk: lazy(() => import('./cdk.svg')),
  'ce-application': lazy(() => import('./ce-application.svg')),
  'ce-beta': lazy(() => import('./ce-beta.svg')),
  'ce-budget_colored': lazy(() => import('./ce-budget_colored.svg')),
  'ce-budget_grey': lazy(() => import('./ce-budget_grey.svg')),
  'ce-cloud': lazy(() => import('./ce-cloud.svg')),
  'ce-cluster': lazy(() => import('./ce-cluster.svg')),
  'ce-hover': lazy(() => import('./ce-hover.svg')),
  'ce-main-colored': lazy(() => import('./ce-main-colored.svg')),
  'ce-main-grey': lazy(() => import('./ce-main-grey.svg')),
  'ce-main-inverse': lazy(() => import('./ce-main-inverse.svg')),
  'ce-main': lazy(() => import('./ce-main.svg')),
  'ce-optimization': lazy(() => import('./ce-optimization.svg')),
  'ce-visibility-plus': lazy(() => import('./ce-visibility-plus.svg')),
  'ce-visibility': lazy(() => import('./ce-visibility.svg')),
  'cet-agent-tokens-settings': lazy(() => import('./cet-agent-tokens-settings.svg')),
  'cet-agents-settings': lazy(() => import('./cet-agents-settings.svg')),
  'cet-critical-events-settings': lazy(() => import('./cet-critical-events-settings.svg')),
  'cet-grey': lazy(() => import('./cet-grey.svg')),
  'cet-inverse': lazy(() => import('./cet-inverse.svg')),
  'cet-quality-gate': lazy(() => import('./cet-quality-gate.svg')),
  'cet-with-dark-text': lazy(() => import('./cet-with-dark-text.svg')),
  'cet-with-text': lazy(() => import('./cet-with-text.svg')),
  cet: lazy(() => import('./cet.svg')),
  'cf-hover': lazy(() => import('./cf-hover.svg')),
  'cf-main-inverse': lazy(() => import('./cf-main-inverse.svg')),
  'cf-main': lazy(() => import('./cf-main.svg')),
  'cf-nav-featureFlags': lazy(() => import('./cf-nav-featureFlags.svg')),
  'chained-pipeline-hover': lazy(() => import('./chained-pipeline-hover.svg')),
  'chained-pipeline': lazy(() => import('./chained-pipeline.svg')),
  'change-log': lazy(() => import('./change-log.svg')),
  changes: lazy(() => import('./changes.svg')),
  'chaos-cube': lazy(() => import('./chaos-cube.svg')),
  'chaos-experiment-weight': lazy(() => import('./chaos-experiment-weight.svg')),
  'chaos-hubs': lazy(() => import('./chaos-hubs.svg')),
  'chaos-litmuschaos': lazy(() => import('./chaos-litmuschaos.svg')),
  'chaos-main': lazy(() => import('./chaos-main.svg')),
  'chaos-namespace': lazy(() => import('./chaos-namespace.svg')),
  'chaos-nav-chaosguard': lazy(() => import('./chaos-nav-chaosguard.svg')),
  'chaos-nav-chaoshub': lazy(() => import('./chaos-nav-chaoshub.svg')),
  'chaos-nav-experiments': lazy(() => import('./chaos-nav-experiments.svg')),
  'chaos-nav-gamedays': lazy(() => import('./chaos-nav-gamedays.svg')),
  'chaos-nav-network-maps': lazy(() => import('./chaos-nav-network-maps.svg')),
  'chaos-nav-resilience-probes': lazy(() => import('./chaos-nav-resilience-probes.svg')),
  'chaos-scenario-builder-faded': lazy(() => import('./chaos-scenario-builder-faded.svg')),
  'chaos-scenario-builder': lazy(() => import('./chaos-scenario-builder.svg')),
  'chaos-service-discovery': lazy(() => import('./chaos-service-discovery.svg')),
  'chaos-sketch': lazy(() => import('./chaos-sketch.svg')),
  'chaos-solid': lazy(() => import('./chaos-solid.svg')),
  'chaos-with-dark-text': lazy(() => import('./chaos-with-dark-text.svg')),
  'chaos-with-text': lazy(() => import('./chaos-with-text.svg')),
  chat: lazy(() => import('./chat.svg')),
  'check-alt': lazy(() => import('./check-alt.svg')),
  check: lazy(() => import('./check.svg')),
  checkov: lazy(() => import('./checkov.svg')),
  'ci-active-build': lazy(() => import('./ci-active-build.svg')),
  'ci-build-pipeline': lazy(() => import('./ci-build-pipeline.svg')),
  'ci-dev-exp': lazy(() => import('./ci-dev-exp.svg')),
  'ci-execution': lazy(() => import('./ci-execution.svg')),
  'ci-gov': lazy(() => import('./ci-gov.svg')),
  'ci-hover': lazy(() => import('./ci-hover.svg')),
  'ci-infra-support': lazy(() => import('./ci-infra-support.svg')),
  'ci-infra': lazy(() => import('./ci-infra.svg')),
  'ci-integrated': lazy(() => import('./ci-integrated.svg')),
  'ci-language': lazy(() => import('./ci-language.svg')),
  'ci-main-inverse': lazy(() => import('./ci-main-inverse.svg')),
  'ci-main': lazy(() => import('./ci-main.svg')),
  'ci-parameterization': lazy(() => import('./ci-parameterization.svg')),
  'ci-pending-build': lazy(() => import('./ci-pending-build.svg')),
  'ci-sketch': lazy(() => import('./ci-sketch.svg')),
  'ci-solid-current-color': lazy(() => import('./ci-solid-current-color.svg')),
  'ci-solid': lazy(() => import('./ci-solid.svg')),
  'ci-test-step': lazy(() => import('./ci-test-step.svg')),
  'ci-ti': lazy(() => import('./ci-ti.svg')),
  'ci-try-pipeline': lazy(() => import('./ci-try-pipeline.svg')),
  'ci-with-dark-text': lazy(() => import('./ci-with-dark-text.svg')),
  'ci-with-text': lazy(() => import('./ci-with-text.svg')),
  'circle-cross': lazy(() => import('./circle-cross.svg')),
  'circle-pipeline-rollback': lazy(() => import('./circle-pipeline-rollback.svg')),
  'circle-stop': lazy(() => import('./circle-stop.svg')),
  'clipboard-alt': lazy(() => import('./clipboard-alt.svg')),
  'cloud-accounts': lazy(() => import('./cloud-accounts.svg')),
  'cloud-dark': lazy(() => import('./cloud-dark.svg')),
  'cloud-formation-create': lazy(() => import('./cloud-formation-create.svg')),
  'cloud-formation-delete': lazy(() => import('./cloud-formation-delete.svg')),
  'cloud-formation-rollback': lazy(() => import('./cloud-formation-rollback.svg')),
  'cloud-foundry': lazy(() => import('./cloud-foundry.svg')),
  'cloud-function-no-traffic-shift': lazy(() => import('./cloud-function-no-traffic-shift.svg')),
  'cloud-function-rollback': lazy(() => import('./cloud-function-rollback.svg')),
  'cloud-function-traffic-shift': lazy(() => import('./cloud-function-traffic-shift.svg')),
  'cloud-light': lazy(() => import('./cloud-light.svg')),
  'cloud-sso': lazy(() => import('./cloud-sso.svg')),
  cloudformation: lazy(() => import('./cloudformation.svg')),
  clusterEffieiencyScore: lazy(() => import('./clusterEffieiencyScore.svg')),
  'cmd-probe': lazy(() => import('./cmd-probe.svg')),
  'code-ascending': lazy(() => import('./code-ascending.svg')),
  'code-branch-small': lazy(() => import('./code-branch-small.svg')),
  'code-branch': lazy(() => import('./code-branch.svg')),
  'code-chat': lazy(() => import('./code-chat.svg')),
  'code-clone': lazy(() => import('./code-clone.svg')),
  'code-close': lazy(() => import('./code-close.svg')),
  'code-closed': lazy(() => import('./code-closed.svg')),
  'code-commit-light': lazy(() => import('./code-commit-light.svg')),
  'code-commit-small': lazy(() => import('./code-commit-small.svg')),
  'code-commit': lazy(() => import('./code-commit.svg')),
  'code-content': lazy(() => import('./code-content.svg')),
  'code-copy': lazy(() => import('./code-copy.svg')),
  'code-delete': lazy(() => import('./code-delete.svg')),
  'code-descending': lazy(() => import('./code-descending.svg')),
  'code-draft': lazy(() => import('./code-draft.svg')),
  'code-edit': lazy(() => import('./code-edit.svg')),
  'code-file-light': lazy(() => import('./code-file-light.svg')),
  'code-file': lazy(() => import('./code-file.svg')),
  'code-folder': lazy(() => import('./code-folder.svg')),
  'code-gear': lazy(() => import('./code-gear.svg')),
  'code-history': lazy(() => import('./code-history.svg')),
  'code-info': lazy(() => import('./code-info.svg')),
  'code-merged': lazy(() => import('./code-merged.svg')),
  'code-more': lazy(() => import('./code-more.svg')),
  'code-open': lazy(() => import('./code-open.svg')),
  'code-pull-request': lazy(() => import('./code-pull-request.svg')),
  'code-pull': lazy(() => import('./code-pull.svg')),
  'code-quote': lazy(() => import('./code-quote.svg')),
  'code-rejected': lazy(() => import('./code-rejected.svg')),
  'code-repo': lazy(() => import('./code-repo.svg')),
  'code-settings': lazy(() => import('./code-settings.svg')),
  'code-tag': lazy(() => import('./code-tag.svg')),
  'code-webhook': lazy(() => import('./code-webhook.svg')),
  code: lazy(() => import('./code.svg')),
  'codebase-invalid': lazy(() => import('./codebase-invalid.svg')),
  'codebase-not-configured': lazy(() => import('./codebase-not-configured.svg')),
  'codebase-valid': lazy(() => import('./codebase-valid.svg')),
  'codebase-validating': lazy(() => import('./codebase-validating.svg')),
  'codebase-zero-state': lazy(() => import('./codebase-zero-state.svg')),
  'command-approval': lazy(() => import('./command-approval.svg')),
  'command-artifact-check': lazy(() => import('./command-artifact-check.svg')),
  'command-barrier': lazy(() => import('./command-barrier.svg')),
  'command-calendar': lazy(() => import('./command-calendar.svg')),
  'command-echo': lazy(() => import('./command-echo.svg')),
  'command-email': lazy(() => import('./command-email.svg')),
  'command-http': lazy(() => import('./command-http.svg')),
  'command-icon': lazy(() => import('./command-icon.svg')),
  'command-install': lazy(() => import('./command-install.svg')),
  'command-resource-constraint': lazy(() => import('./command-resource-constraint.svg')),
  'command-rollback': lazy(() => import('./command-rollback.svg')),
  'command-shell-script': lazy(() => import('./command-shell-script.svg')),
  'command-start': lazy(() => import('./command-start.svg')),
  'command-stop': lazy(() => import('./command-stop.svg')),
  'command-swap': lazy(() => import('./command-swap.svg')),
  'command-switch': lazy(() => import('./command-switch.svg')),
  'command-winrm': lazy(() => import('./command-winrm.svg')),
  'compare-version': lazy(() => import('./compare-version.svg')),
  'conditional-execution': lazy(() => import('./conditional-execution.svg')),
  'conditional-filled': lazy(() => import('./conditional-filled.svg')),
  'conditional-skip-filled': lazy(() => import('./conditional-skip-filled.svg')),
  'conditional-skip-new': lazy(() => import('./conditional-skip-new.svg')),
  'conditional-skip': lazy(() => import('./conditional-skip.svg')),
  'conditional-when': lazy(() => import('./conditional-when.svg')),
  'config-change': lazy(() => import('./config-change.svg')),
  'config-file': lazy(() => import('./config-file.svg')),
  configure: lazy(() => import('./configure.svg')),
  confluence: lazy(() => import('./confluence.svg')),
  'connectivity-mode': lazy(() => import('./connectivity-mode.svg')),
  'connectors-blue': lazy(() => import('./connectors-blue.svg')),
  'connectors-icon': lazy(() => import('./connectors-icon.svg')),
  connectthroughdelegate: lazy(() => import('./connectthroughdelegate.svg')),
  connectthroughmanager: lazy(() => import('./connectthroughmanager.svg')),
  'contact-support': lazy(() => import('./contact-support.svg')),
  container: lazy(() => import('./container.svg')),
  cookiecutter: lazy(() => import('./cookiecutter.svg')),
  'copy-alt': lazy(() => import('./copy-alt.svg')),
  'copy-doc': lazy(() => import('./copy-doc.svg')),
  copy: lazy(() => import('./copy.svg')),
  'cost-change': lazy(() => import('./cost-change.svg')),
  'cost-data-collection': lazy(() => import('./cost-data-collection.svg')),
  'coverage-status-error': lazy(() => import('./coverage-status-error.svg')),
  'coverage-status-success': lazy(() => import('./coverage-status-success.svg')),
  coverity: lazy(() => import('./coverity.svg')),
  'create-pr': lazy(() => import('./create-pr.svg')),
  'create-via-existing-yaml': lazy(() => import('./create-via-existing-yaml.svg')),
  'create-via-pipeline-template': lazy(() => import('./create-via-pipeline-template.svg')),
  'create-via-starter-pipeline': lazy(() => import('./create-via-starter-pipeline.svg')),
  'critical-events': lazy(() => import('./critical-events.svg')),
  'cs-hover': lazy(() => import('./cs-hover.svg')),
  'currency-banner': lazy(() => import('./currency-banner.svg')),
  'custom-approval': lazy(() => import('./custom-approval.svg')),
  'custom-artifact': lazy(() => import('./custom-artifact.svg')),
  'custom-ingest': lazy(() => import('./custom-ingest.svg')),
  'custom-plugin': lazy(() => import('./custom-plugin.svg')),
  'custom-remote-manifest': lazy(() => import('./custom-remote-manifest.svg')),
  'custom-scan': lazy(() => import('./custom-scan.svg')),
  'custom-service': lazy(() => import('./custom-service.svg')),
  'custom-sm': lazy(() => import('./custom-sm.svg')),
  'custom-stage-icon': lazy(() => import('./custom-stage-icon.svg')),
  'custom-stage': lazy(() => import('./custom-stage.svg')),
  customRole: lazy(() => import('./customRole.svg')),
  customize: lazy(() => import('./customize.svg')),
  'cv-hover': lazy(() => import('./cv-hover.svg')),
  'cv-main-inverse': lazy(() => import('./cv-main-inverse.svg')),
  'cv-main': lazy(() => import('./cv-main.svg')),
  'cv-sketch': lazy(() => import('./cv-sketch.svg')),
  'cv-solid-current-color': lazy(() => import('./cv-solid-current-color.svg')),
  'cv-solid': lazy(() => import('./cv-solid.svg')),
  'cv-verifystep-inverse': lazy(() => import('./cv-verifystep-inverse.svg')),
  'cv-verifystep': lazy(() => import('./cv-verifystep.svg')),
  'cv-with-text': lazy(() => import('./cv-with-text.svg')),
  'danger-icon': lazy(() => import('./danger-icon.svg')),
  'dashboard-selected': lazy(() => import('./dashboard-selected.svg')),
  dashboard: lazy(() => import('./dashboard.svg')),
  'dashboards-solid-border': lazy(() => import('./dashboards-solid-border.svg')),
  'data-fetch-error': lazy(() => import('./data-fetch-error.svg')),
  'db-devops': lazy(() => import('./db-devops.svg')),
  'db-schema': lazy(() => import('./db-schema.svg')),
  'default-dashboard': lazy(() => import('./default-dashboard.svg')),
  'delegates-blue': lazy(() => import('./delegates-blue.svg')),
  'delegates-icon': lazy(() => import('./delegates-icon.svg')),
  'dependency-ci-step-inverse': lazy(() => import('./dependency-ci-step-inverse.svg')),
  'dependency-ci-step': lazy(() => import('./dependency-ci-step.svg')),
  'dependency-default-icon': lazy(() => import('./dependency-default-icon.svg')),
  'dependency-step': lazy(() => import('./dependency-step.svg')),
  'deploy-cloud-function': lazy(() => import('./deploy-cloud-function.svg')),
  'deploy-stage': lazy(() => import('./deploy-stage.svg')),
  'deployment-aborted-legacy': lazy(() => import('./deployment-aborted-legacy.svg')),
  'deployment-aborted-new': lazy(() => import('./deployment-aborted-new.svg')),
  'deployment-failed-legacy': lazy(() => import('./deployment-failed-legacy.svg')),
  'deployment-failed-new': lazy(() => import('./deployment-failed-new.svg')),
  'deployment-incomplete-legacy': lazy(() => import('./deployment-incomplete-legacy.svg')),
  'deployment-incomplete-new': lazy(() => import('./deployment-incomplete-new.svg')),
  'deployment-inprogress-legacy': lazy(() => import('./deployment-inprogress-legacy.svg')),
  'deployment-inprogress-new': lazy(() => import('./deployment-inprogress-new.svg')),
  'deployment-paused-legacy': lazy(() => import('./deployment-paused-legacy.svg')),
  'deployment-paused-new': lazy(() => import('./deployment-paused-new.svg')),
  'deployment-queued-legacy': lazy(() => import('./deployment-queued-legacy.svg')),
  'deployment-queued-new': lazy(() => import('./deployment-queued-new.svg')),
  'deployment-rejected-legacy': lazy(() => import('./deployment-rejected-legacy.svg')),
  'deployment-rejected-new': lazy(() => import('./deployment-rejected-new.svg')),
  'deployment-success-legacy': lazy(() => import('./deployment-success-legacy.svg')),
  'deployment-success-new': lazy(() => import('./deployment-success-new.svg')),
  'deployment-timeout-legacy': lazy(() => import('./deployment-timeout-legacy.svg')),
  'deployment-timeout-new': lazy(() => import('./deployment-timeout-new.svg')),
  description: lazy(() => import('./description.svg')),
  'digital-ocean': lazy(() => import('./digital-ocean.svg')),
  'docker-ci-step-inverse': lazy(() => import('./docker-ci-step-inverse.svg')),
  'docker-ci-step': lazy(() => import('./docker-ci-step.svg')),
  'docker-content-trust-inverse': lazy(() => import('./docker-content-trust-inverse.svg')),
  'docker-content-trust': lazy(() => import('./docker-content-trust.svg')),
  'docker-grey': lazy(() => import('./docker-grey.svg')),
  'docker-hub-step': lazy(() => import('./docker-hub-step.svg')),
  'docker-step-inverse': lazy(() => import('./docker-step-inverse.svg')),
  'docker-step': lazy(() => import('./docker-step.svg')),
  docs: lazy(() => import('./docs.svg')),
  dotnet: lazy(() => import('./dotnet.svg')),
  down: lazy(() => import('./down.svg')),
  'download-aws-s3-store': lazy(() => import('./download-aws-s3-store.svg')),
  'download-box': lazy(() => import('./download-box.svg')),
  'download-harness-store': lazy(() => import('./download-harness-store.svg')),
  'download-manifests-inverse': lazy(() => import('./download-manifests-inverse.svg')),
  'download-manifests': lazy(() => import('./download-manifests.svg')),
  'dry-run': lazy(() => import('./dry-run.svg')),
  'ecr-ci-step-inverse': lazy(() => import('./ecr-ci-step-inverse.svg')),
  'ecr-ci-step': lazy(() => import('./ecr-ci-step.svg')),
  'ecr-step-inverse': lazy(() => import('./ecr-step-inverse.svg')),
  'ecr-step': lazy(() => import('./ecr-step.svg')),
  'ecs-service-setup-inverse': lazy(() => import('./ecs-service-setup-inverse.svg')),
  'ecs-service-setup': lazy(() => import('./ecs-service-setup.svg')),
  'ecs-upgrade-containers-inverse': lazy(() => import('./ecs-upgrade-containers-inverse.svg')),
  'ecs-upgrade-containers': lazy(() => import('./ecs-upgrade-containers.svg')),
  'eema-dark': lazy(() => import('./eema-dark.svg')),
  'eema-light': lazy(() => import('./eema-light.svg')),
  'eks-inverse': lazy(() => import('./eks-inverse.svg')),
  eks: lazy(() => import('./eks.svg')),
  'elastic-kubernetes-service': lazy(() => import('./elastic-kubernetes-service.svg')),
  'elastigroup-bluegreen-inverse': lazy(() => import('./elastigroup-bluegreen-inverse.svg')),
  'elastigroup-bluegreen': lazy(() => import('./elastigroup-bluegreen.svg')),
  'elastigroup-canary': lazy(() => import('./elastigroup-canary.svg')),
  'elastigroup-canarydelete': lazy(() => import('./elastigroup-canarydelete.svg')),
  'elastigroup-deploy-inverse': lazy(() => import('./elastigroup-deploy-inverse.svg')),
  'elastigroup-deploy': lazy(() => import('./elastigroup-deploy.svg')),
  'elastigroup-inverse': lazy(() => import('./elastigroup-inverse.svg')),
  'elastigroup-setup-inverse': lazy(() => import('./elastigroup-setup-inverse.svg')),
  'elastigroup-setup': lazy(() => import('./elastigroup-setup.svg')),
  'elastigroup-swap-inverse': lazy(() => import('./elastigroup-swap-inverse.svg')),
  'elastigroup-swap': lazy(() => import('./elastigroup-swap.svg')),
  elastigroup: lazy(() => import('./elastigroup.svg')),
  elk: lazy(() => import('./elk.svg')),
  'email-inline': lazy(() => import('./email-inline.svg')),
  'email-step': lazy(() => import('./email-step.svg')),
  entity: lazy(() => import('./entity.svg')),
  'environment-group-outline': lazy(() => import('./environment-group-outline.svg')),
  'environment-group': lazy(() => import('./environment-group.svg')),
  environment: lazy(() => import('./environment.svg')),
  'environments-outline': lazy(() => import('./environments-outline.svg')),
  environments: lazy(() => import('./environments.svg')),
  'error-outline': lazy(() => import('./error-outline.svg')),
  'error-tracking': lazy(() => import('./error-tracking.svg')),
  'error-transparent-no-outline': lazy(() => import('./error-transparent-no-outline.svg')),
  'evaluate-policy': lazy(() => import('./evaluate-policy.svg')),
  'execution-abort': lazy(() => import('./execution-abort.svg')),
  'execution-completed': lazy(() => import('./execution-completed.svg')),
  'execution-conditional': lazy(() => import('./execution-conditional.svg')),
  'execution-destroy-strategy': lazy(() => import('./execution-destroy-strategy.svg')),
  'execution-destroy': lazy(() => import('./execution-destroy.svg')),
  'execution-error': lazy(() => import('./execution-error.svg')),
  'execution-history': lazy(() => import('./execution-history.svg')),
  'execution-input': lazy(() => import('./execution-input.svg')),
  'execution-issue': lazy(() => import('./execution-issue.svg')),
  'execution-paused': lazy(() => import('./execution-paused.svg')),
  'execution-provision-strategy': lazy(() => import('./execution-provision-strategy.svg')),
  'execution-provision': lazy(() => import('./execution-provision.svg')),
  'execution-rollback': lazy(() => import('./execution-rollback.svg')),
  'execution-running': lazy(() => import('./execution-running.svg')),
  'execution-stopped': lazy(() => import('./execution-stopped.svg')),
  'execution-success': lazy(() => import('./execution-success.svg')),
  'execution-timeout': lazy(() => import('./execution-timeout.svg')),
  'execution-waiting': lazy(() => import('./execution-waiting.svg')),
  'execution-warning': lazy(() => import('./execution-warning.svg')),
  execution: lazy(() => import('./execution.svg')),
  expired: lazy(() => import('./expired.svg')),
  explode: lazy(() => import('./explode.svg')),
  'expression-input': lazy(() => import('./expression-input.svg')),
  'failure-strategy': lazy(() => import('./failure-strategy.svg')),
  'fat-arrow-up': lazy(() => import('./fat-arrow-up.svg')),
  'feature-flag-stage': lazy(() => import('./feature-flag-stage.svg')),
  'feedback-given': lazy(() => import('./feedback-given.svg')),
  'ff-sketch': lazy(() => import('./ff-sketch.svg')),
  'ff-solid': lazy(() => import('./ff-solid.svg')),
  'ff-with-dark-text': lazy(() => import('./ff-with-dark-text.svg')),
  'ff-with-text': lazy(() => import('./ff-with-text.svg')),
  file: lazy(() => import('./file.svg')),
  filestore: lazy(() => import('./filestore.svg')),
  firehydrant: lazy(() => import('./firehydrant.svg')),
  'fixed-input': lazy(() => import('./fixed-input.svg')),
  'flag-tick': lazy(() => import('./flag-tick.svg')),
  flag: lazy(() => import('./flag.svg')),
  flash: lazy(() => import('./flash.svg')),
  flux: lazy(() => import('./flux.svg')),
  'folder-upload': lazy(() => import('./folder-upload.svg')),
  folder: lazy(() => import('./folder.svg')),
  'fortify-on-demand-inverse': lazy(() => import('./fortify-on-demand-inverse.svg')),
  'fortify-on-demand': lazy(() => import('./fortify-on-demand.svg')),
  'fossa-inverse': lazy(() => import('./fossa-inverse.svg')),
  fossa: lazy(() => import('./fossa.svg')),
  'fs-closed-folder': lazy(() => import('./fs-closed-folder.svg')),
  'fs-open-folder': lazy(() => import('./fs-open-folder.svg')),
  'fs-root-folder': lazy(() => import('./fs-root-folder.svg')),
  'full-screen-exit': lazy(() => import('./full-screen-exit.svg')),
  'full-screen': lazy(() => import('./full-screen.svg')),
  functions: lazy(() => import('./functions.svg')),
  'gar-step-inverse': lazy(() => import('./gar-step-inverse.svg')),
  'gar-step': lazy(() => import('./gar-step.svg')),
  'gcp-engine': lazy(() => import('./gcp-engine.svg')),
  'gcp-kms': lazy(() => import('./gcp-kms.svg')),
  'gcp-secret-manager': lazy(() => import('./gcp-secret-manager.svg')),
  gcp: lazy(() => import('./gcp.svg')),
  'gcr-ci-step-inverse': lazy(() => import('./gcr-ci-step-inverse.svg')),
  'gcr-ci-step': lazy(() => import('./gcr-ci-step.svg')),
  'gcr-step-inverse': lazy(() => import('./gcr-step-inverse.svg')),
  'gcr-step': lazy(() => import('./gcr-step.svg')),
  'gcs-ci-step-inverse': lazy(() => import('./gcs-ci-step-inverse.svg')),
  'gcs-ci-step': lazy(() => import('./gcs-ci-step.svg')),
  'gcs-step-inverse': lazy(() => import('./gcs-step-inverse.svg')),
  'gcs-step': lazy(() => import('./gcs-step.svg')),
  gear: lazy(() => import('./gear.svg')),
  'generic-repository-type': lazy(() => import('./generic-repository-type.svg')),
  'get-started': lazy(() => import('./get-started.svg')),
  'git-branch-existing': lazy(() => import('./git-branch-existing.svg')),
  'git-clone-ci-step-inverse': lazy(() => import('./git-clone-ci-step-inverse.svg')),
  'git-clone-ci-step': lazy(() => import('./git-clone-ci-step.svg')),
  'git-clone-step': lazy(() => import('./git-clone-step.svg')),
  'git-configure': lazy(() => import('./git-configure.svg')),
  'git-experience-setting': lazy(() => import('./git-experience-setting.svg')),
  'git-landing-page': lazy(() => import('./git-landing-page.svg')),
  'git-new-branch': lazy(() => import('./git-new-branch.svg')),
  'git-popover': lazy(() => import('./git-popover.svg')),
  'github-action-plugin': lazy(() => import('./github-action-plugin.svg')),
  'github-actions': lazy(() => import('./github-actions.svg')),
  'github-insights': lazy(() => import('./github-insights.svg')),
  'github-selected': lazy(() => import('./github-selected.svg')),
  'github-unselected': lazy(() => import('./github-unselected.svg')),
  github: lazy(() => import('./github.svg')),
  'gitlab-selected': lazy(() => import('./gitlab-selected.svg')),
  'gitlab-unselected': lazy(() => import('./gitlab-unselected.svg')),
  gitlab: lazy(() => import('./gitlab.svg')),
  gitleaks: lazy(() => import('./gitleaks.svg')),
  'gitness-no-repositories': lazy(() => import('./gitness-no-repositories.svg')),
  'gitops-agent-blue': lazy(() => import('./gitops-agent-blue.svg')),
  'gitops-agent': lazy(() => import('./gitops-agent.svg')),
  'gitops-agents-blue-circle': lazy(() => import('./gitops-agents-blue-circle.svg')),
  'gitops-application-white': lazy(() => import('./gitops-application-white.svg')),
  'gitops-application': lazy(() => import('./gitops-application.svg')),
  'gitops-applications-blue-circle': lazy(() => import('./gitops-applications-blue-circle.svg')),
  'gitops-blue-circle': lazy(() => import('./gitops-blue-circle.svg')),
  'gitops-blue': lazy(() => import('./gitops-blue.svg')),
  'gitops-clusters-blue-circle': lazy(() => import('./gitops-clusters-blue-circle.svg')),
  'gitops-clusters-blue': lazy(() => import('./gitops-clusters-blue.svg')),
  'gitops-clusters': lazy(() => import('./gitops-clusters.svg')),
  'gitops-gnupg-key-blue-circle': lazy(() => import('./gitops-gnupg-key-blue-circle.svg')),
  'gitops-gnupg-key-blue': lazy(() => import('./gitops-gnupg-key-blue.svg')),
  'gitops-green': lazy(() => import('./gitops-green.svg')),
  'gitops-missing': lazy(() => import('./gitops-missing.svg')),
  'gitops-no': lazy(() => import('./gitops-no.svg')),
  'gitops-repo-cert-blue': lazy(() => import('./gitops-repo-cert-blue.svg')),
  'gitops-repository-blue-circle': lazy(() => import('./gitops-repository-blue-circle.svg')),
  'gitops-repository-blue': lazy(() => import('./gitops-repository-blue.svg')),
  'gitops-repository-certificates-blue-circle': lazy(() => import('./gitops-repository-certificates-blue-circle.svg')),
  'gitops-suspended': lazy(() => import('./gitops-suspended.svg')),
  'gitops-unknown': lazy(() => import('./gitops-unknown.svg')),
  'gitops-yes': lazy(() => import('./gitops-yes.svg')),
  gitops: lazy(() => import('./gitops.svg')),
  gitspaces: lazy(() => import('./gitspaces.svg')),
  golang: lazy(() => import('./golang.svg')),
  'google-kubernetes-engine': lazy(() => import('./google-kubernetes-engine.svg')),
  google: lazy(() => import('./google.svg')),
  'governance-policy-set': lazy(() => import('./governance-policy-set.svg')),
  'governance-shield': lazy(() => import('./governance-shield.svg')),
  governance: lazy(() => import('./governance.svg')),
  'gradle-repository-type': lazy(() => import('./gradle-repository-type.svg')),
  grafana: lazy(() => import('./grafana.svg')),
  'graph-increase': lazy(() => import('./graph-increase.svg')),
  graph: lazy(() => import('./graph.svg')),
  'grey-cluster': lazy(() => import('./grey-cluster.svg')),
  grid: lazy(() => import('./grid.svg')),
  'hand-manual': lazy(() => import('./hand-manual.svg')),
  'harness-copilot': lazy(() => import('./harness-copilot.svg')),
  'harness-grey': lazy(() => import('./harness-grey.svg')),
  'harness-logo-black': lazy(() => import('./harness-logo-black.svg')),
  'harness-logo-white-bg-blue': lazy(() => import('./harness-logo-white-bg-blue.svg')),
  'harness-logo-white': lazy(() => import('./harness-logo-white.svg')),
  'harness-plugin': lazy(() => import('./harness-plugin.svg')),
  'harness-with-color': lazy(() => import('./harness-with-color.svg')),
  harness: lazy(() => import('./harness.svg')),
  hashiCorpVault: lazy(() => import('./hashiCorpVault.svg')),
  health: lazy(() => import('./health.svg')),
  'helm-oci': lazy(() => import('./helm-oci.svg')),
  'helm-rollback': lazy(() => import('./helm-rollback.svg')),
  help: lazy(() => import('./help.svg')),
  'hexagon-outline': lazy(() => import('./hexagon-outline.svg')),
  hotfix: lazy(() => import('./hotfix.svg')),
  hourglass: lazy(() => import('./hourglass.svg')),
  'http-probe': lazy(() => import('./http-probe.svg')),
  'http-step': lazy(() => import('./http-step.svg')),
  'iacm-blue': lazy(() => import('./iacm-blue.svg')),
  'iacm-grey': lazy(() => import('./iacm-grey.svg')),
  'iacm-opentofu-inverse-step': lazy(() => import('./iacm-opentofu-inverse-step.svg')),
  'iacm-opentofu-step': lazy(() => import('./iacm-opentofu-step.svg')),
  'iacm-resource-added': lazy(() => import('./iacm-resource-added.svg')),
  'iacm-resource-changed': lazy(() => import('./iacm-resource-changed.svg')),
  'iacm-resource-deleted': lazy(() => import('./iacm-resource-deleted.svg')),
  'iacm-resource-unchanged': lazy(() => import('./iacm-resource-unchanged.svg')),
  'iacm-terraform-step': lazy(() => import('./iacm-terraform-step.svg')),
  iacm: lazy(() => import('./iacm.svg')),
  'idp-nav-allowlist': lazy(() => import('./idp-nav-allowlist.svg')),
  'idp-nav-connectors': lazy(() => import('./idp-nav-connectors.svg')),
  'idp-nav-layout': lazy(() => import('./idp-nav-layout.svg')),
  'idp-nav-oauth': lazy(() => import('./idp-nav-oauth.svg')),
  'idp-nav-pluginconfig': lazy(() => import('./idp-nav-pluginconfig.svg')),
  'idp-nav-plugins': lazy(() => import('./idp-nav-plugins.svg')),
  'idp-nav-scorecards': lazy(() => import('./idp-nav-scorecards.svg')),
  'idp-stage-hover': lazy(() => import('./idp-stage-hover.svg')),
  'idp-with-dark-text': lazy(() => import('./idp-with-dark-text.svg')),
  idp: lazy(() => import('./idp.svg')),
  'ignore-failed-square': lazy(() => import('./ignore-failed-square.svg')),
  'ignore-list': lazy(() => import('./ignore-list.svg')),
  ignoreFailed: lazy(() => import('./ignoreFailed.svg')),
  'image-app-layer': lazy(() => import('./image-app-layer.svg')),
  'image-base-layer': lazy(() => import('./image-base-layer.svg')),
  'image-distro-layer': lazy(() => import('./image-distro-layer.svg')),
  incidents: lazy(() => import('./incidents.svg')),
  infinityTrend: lazy(() => import('./infinityTrend.svg')),
  'info-message': lazy(() => import('./info-message.svg')),
  'info-messaging': lazy(() => import('./info-messaging.svg')),
  info: lazy(() => import('./info.svg')),
  infrastructure: lazy(() => import('./infrastructure.svg')),
  'initialize-ci-step-inverse': lazy(() => import('./initialize-ci-step-inverse.svg')),
  'initialize-ci-step': lazy(() => import('./initialize-ci-step.svg')),
  'initialize-step-inverse': lazy(() => import('./initialize-step-inverse.svg')),
  'initialize-step': lazy(() => import('./initialize-step.svg')),
  'insight-view': lazy(() => import('./insight-view.svg')),
  instances: lazy(() => import('./instances.svg')),
  integration: lazy(() => import('./integration.svg')),
  'iro-logo-outline': lazy(() => import('./iro-logo-outline.svg')),
  'iro-main': lazy(() => import('./iro-main.svg')),
  java: lazy(() => import('./java.svg')),
  'jira-approve-inverse': lazy(() => import('./jira-approve-inverse.svg')),
  'jira-approve': lazy(() => import('./jira-approve.svg')),
  'jira-create-inverse': lazy(() => import('./jira-create-inverse.svg')),
  'jira-create': lazy(() => import('./jira-create.svg')),
  'jira-update-inverse': lazy(() => import('./jira-update-inverse.svg')),
  'jira-update': lazy(() => import('./jira-update.svg')),
  'k8s-patch': lazy(() => import('./k8s-patch.svg')),
  'k8s-traffic-routing': lazy(() => import('./k8s-traffic-routing.svg')),
  'key-main': lazy(() => import('./key-main.svg')),
  key: lazy(() => import('./key.svg')),
  'kubernetes-gitops': lazy(() => import('./kubernetes-gitops.svg')),
  'kubernetes-harness': lazy(() => import('./kubernetes-harness.svg')),
  kustamize: lazy(() => import('./kustamize.svg')),
  kustomizeparam: lazy(() => import('./kustomizeparam.svg')),
  launch: lazy(() => import('./launch.svg')),
  'layers-outline': lazy(() => import('./layers-outline.svg')),
  'layout-bottom': lazy(() => import('./layout-bottom.svg')),
  'layout-float': lazy(() => import('./layout-float.svg')),
  'layout-right': lazy(() => import('./layout-right.svg')),
  library: lazy(() => import('./library.svg')),
  'line-chart': lazy(() => import('./line-chart.svg')),
  linkedin: lazy(() => import('./linkedin.svg')),
  'list-blue': lazy(() => import('./list-blue.svg')),
  'list-entity-infographic': lazy(() => import('./list-entity-infographic.svg')),
  'list-vars': lazy(() => import('./list-vars.svg')),
  'list-view': lazy(() => import('./list-view.svg')),
  loading: lazy(() => import('./loading.svg')),
  looping: lazy(() => import('./looping.svg')),
  'main-abort': lazy(() => import('./main-abort.svg')),
  'main-account-notifications': lazy(() => import('./main-account-notifications.svg')),
  'main-add': lazy(() => import('./main-add.svg')),
  'main-applications': lazy(() => import('./main-applications.svg')),
  'main-apply': lazy(() => import('./main-apply.svg')),
  'main-baseline': lazy(() => import('./main-baseline.svg')),
  'main-calendar': lazy(() => import('./main-calendar.svg')),
  'main-canary': lazy(() => import('./main-canary.svg')),
  'main-caret-down': lazy(() => import('./main-caret-down.svg')),
  'main-caret-left': lazy(() => import('./main-caret-left.svg')),
  'main-caret-right': lazy(() => import('./main-caret-right.svg')),
  'main-caret-up': lazy(() => import('./main-caret-up.svg')),
  'main-changelog': lazy(() => import('./main-changelog.svg')),
  'main-chevron-down': lazy(() => import('./main-chevron-down.svg')),
  'main-chevron-left': lazy(() => import('./main-chevron-left.svg')),
  'main-chevron-right': lazy(() => import('./main-chevron-right.svg')),
  'main-chevron-up': lazy(() => import('./main-chevron-up.svg')),
  'main-clone': lazy(() => import('./main-clone.svg')),
  'main-close': lazy(() => import('./main-close.svg')),
  'main-cloud-providers': lazy(() => import('./main-cloud-providers.svg')),
  'main-cloud': lazy(() => import('./main-cloud.svg')),
  'main-code-yaml': lazy(() => import('./main-code-yaml.svg')),
  'main-dashboard': lazy(() => import('./main-dashboard.svg')),
  'main-delegates': lazy(() => import('./main-delegates.svg')),
  'main-delete': lazy(() => import('./main-delete.svg')),
  'main-depricate': lazy(() => import('./main-depricate.svg')),
  'main-destroy': lazy(() => import('./main-destroy.svg')),
  'main-download': lazy(() => import('./main-download.svg')),
  'main-email': lazy(() => import('./main-email.svg')),
  'main-environments': lazy(() => import('./main-environments.svg')),
  'main-feedback': lazy(() => import('./main-feedback.svg')),
  'main-filter': lazy(() => import('./main-filter.svg')),
  'main-flag': lazy(() => import('./main-flag.svg')),
  'main-folder-new': lazy(() => import('./main-folder-new.svg')),
  'main-folder-open': lazy(() => import('./main-folder-open.svg')),
  'main-folder': lazy(() => import('./main-folder.svg')),
  'main-fullscreen': lazy(() => import('./main-fullscreen.svg')),
  'main-help': lazy(() => import('./main-help.svg')),
  'main-info': lazy(() => import('./main-info.svg')),
  'main-infrastructure-provisioners': lazy(() => import('./main-infrastructure-provisioners.svg')),
  'main-issue-filled': lazy(() => import('./main-issue-filled.svg')),
  'main-issue': lazy(() => import('./main-issue.svg')),
  'main-like': lazy(() => import('./main-like.svg')),
  'main-link': lazy(() => import('./main-link.svg')),
  'main-list': lazy(() => import('./main-list.svg')),
  'main-listener-update': lazy(() => import('./main-listener-update.svg')),
  'main-lock': lazy(() => import('./main-lock.svg')),
  'main-main-zoom_in': lazy(() => import('./main-main-zoom_in.svg')),
  'main-maximize': lazy(() => import('./main-maximize.svg')),
  'main-minimize': lazy(() => import('./main-minimize.svg')),
  'main-more': lazy(() => import('./main-more.svg')),
  'main-move': lazy(() => import('./main-move.svg')),
  'main-notes': lazy(() => import('./main-notes.svg')),
  'main-notifications': lazy(() => import('./main-notifications.svg')),
  'main-pause': lazy(() => import('./main-pause.svg')),
  'main-pin': lazy(() => import('./main-pin.svg')),
  'main-pipelines': lazy(() => import('./main-pipelines.svg')),
  'main-popularity': lazy(() => import('./main-popularity.svg')),
  'main-refresh': lazy(() => import('./main-refresh.svg')),
  'main-reorder': lazy(() => import('./main-reorder.svg')),
  'main-rerun': lazy(() => import('./main-rerun.svg')),
  'main-resume': lazy(() => import('./main-resume.svg')),
  'main-rollback': lazy(() => import('./main-rollback.svg')),
  'main-saved': lazy(() => import('./main-saved.svg')),
  'main-scope': lazy(() => import('./main-scope.svg')),
  'main-search': lazy(() => import('./main-search.svg')),
  'main-service-ami': lazy(() => import('./main-service-ami.svg')),
  'main-services': lazy(() => import('./main-services.svg')),
  'main-setup': lazy(() => import('./main-setup.svg')),
  'main-share': lazy(() => import('./main-share.svg')),
  'main-sort': lazy(() => import('./main-sort.svg')),
  'main-start': lazy(() => import('./main-start.svg')),
  'main-tags': lazy(() => import('./main-tags.svg')),
  'main-template-library': lazy(() => import('./main-template-library.svg')),
  'main-thumbsdown': lazy(() => import('./main-thumbsdown.svg')),
  'main-thumbsup': lazy(() => import('./main-thumbsup.svg')),
  'main-tick': lazy(() => import('./main-tick.svg')),
  'main-trash': lazy(() => import('./main-trash.svg')),
  'main-unlock': lazy(() => import('./main-unlock.svg')),
  'main-unpin': lazy(() => import('./main-unpin.svg')),
  'main-upload': lazy(() => import('./main-upload.svg')),
  'main-user-groups': lazy(() => import('./main-user-groups.svg')),
  'main-user': lazy(() => import('./main-user.svg')),
  'main-view': lazy(() => import('./main-view.svg')),
  'main-workflows': lazy(() => import('./main-workflows.svg')),
  'main-zoom-out': lazy(() => import('./main-zoom-out.svg')),
  'mark-as-failed': lazy(() => import('./mark-as-failed.svg')),
  'mark-as-failure-inverse': lazy(() => import('./mark-as-failure-inverse.svg')),
  'mark-as-failure': lazy(() => import('./mark-as-failure.svg')),
  'maven-repository-type': lazy(() => import('./maven-repository-type.svg')),
  memberRole: lazy(() => import('./memberRole.svg')),
  'mend-inverse': lazy(() => import('./mend-inverse.svg')),
  mend: lazy(() => import('./mend.svg')),
  'merge-pr': lazy(() => import('./merge-pr.svg')),
  'metasploit-inverse': lazy(() => import('./metasploit-inverse.svg')),
  metasploit: lazy(() => import('./metasploit.svg')),
  'microsoft-azure': lazy(() => import('./microsoft-azure.svg')),
  'money-icon': lazy(() => import('./money-icon.svg')),
  'monitored-service': lazy(() => import('./monitored-service.svg')),
  'multi-service': lazy(() => import('./multi-service.svg')),
  'nav-account-admin-hover': lazy(() => import('./nav-account-admin-hover.svg')),
  'nav-account-admin-selected': lazy(() => import('./nav-account-admin-selected.svg')),
  'nav-account-admin': lazy(() => import('./nav-account-admin.svg')),
  'nav-builds': lazy(() => import('./nav-builds.svg')),
  'nav-cd-hover': lazy(() => import('./nav-cd-hover.svg')),
  'nav-cd-selected': lazy(() => import('./nav-cd-selected.svg')),
  'nav-cd': lazy(() => import('./nav-cd.svg')),
  'nav-cf': lazy(() => import('./nav-cf.svg')),
  'nav-cv-hover': lazy(() => import('./nav-cv-hover.svg')),
  'nav-cv-selected': lazy(() => import('./nav-cv-selected.svg')),
  'nav-cv': lazy(() => import('./nav-cv.svg')),
  'nav-dashboard-hover': lazy(() => import('./nav-dashboard-hover.svg')),
  'nav-dashboard-selected': lazy(() => import('./nav-dashboard-selected.svg')),
  'nav-dashboard': lazy(() => import('./nav-dashboard.svg')),
  'nav-deployments-hover': lazy(() => import('./nav-deployments-hover.svg')),
  'nav-deployments-selected': lazy(() => import('./nav-deployments-selected.svg')),
  'nav-deployments': lazy(() => import('./nav-deployments.svg')),
  'nav-environments': lazy(() => import('./nav-environments.svg')),
  'nav-git-sync': lazy(() => import('./nav-git-sync.svg')),
  'nav-governance-hover': lazy(() => import('./nav-governance-hover.svg')),
  'nav-governance-selected': lazy(() => import('./nav-governance-selected.svg')),
  'nav-governance': lazy(() => import('./nav-governance.svg')),
  'nav-harness-hover': lazy(() => import('./nav-harness-hover.svg')),
  'nav-harness-selected': lazy(() => import('./nav-harness-selected.svg')),
  'nav-harness': lazy(() => import('./nav-harness.svg')),
  'nav-help': lazy(() => import('./nav-help.svg')),
  'nav-home': lazy(() => import('./nav-home.svg')),
  'nav-infrastructure-hover': lazy(() => import('./nav-infrastructure-hover.svg')),
  'nav-infrastructure-selected': lazy(() => import('./nav-infrastructure-selected.svg')),
  'nav-organization': lazy(() => import('./nav-organization.svg')),
  'nav-pipeline': lazy(() => import('./nav-pipeline.svg')),
  'nav-pipelines-selected': lazy(() => import('./nav-pipelines-selected.svg')),
  'nav-pipelines': lazy(() => import('./nav-pipelines.svg')),
  'nav-project': lazy(() => import('./nav-project.svg')),
  'nav-resources-hover': lazy(() => import('./nav-resources-hover.svg')),
  'nav-resources-selected': lazy(() => import('./nav-resources-selected.svg')),
  'nav-resources': lazy(() => import('./nav-resources.svg')),
  'nav-settings': lazy(() => import('./nav-settings.svg')),
  'nav-support': lazy(() => import('./nav-support.svg')),
  'nav-user-profile-hover': lazy(() => import('./nav-user-profile-hover.svg')),
  'nav-user-profile-selected': lazy(() => import('./nav-user-profile-selected.svg')),
  'nav-user-profile': lazy(() => import('./nav-user-profile.svg')),
  'nav-workspaces': lazy(() => import('./nav-workspaces.svg')),
  network: lazy(() => import('./network.svg')),
  'new-artifact': lazy(() => import('./new-artifact.svg')),
  'new-decoration': lazy(() => import('./new-decoration.svg')),
  'new-notification': lazy(() => import('./new-notification.svg')),
  'ng-filter': lazy(() => import('./ng-filter.svg')),
  'nikto-inverse': lazy(() => import('./nikto-inverse.svg')),
  nikto: lazy(() => import('./nikto.svg')),
  'nine-dot-options': lazy(() => import('./nine-dot-options.svg')),
  'nmap-inverse': lazy(() => import('./nmap-inverse.svg')),
  nmap: lazy(() => import('./nmap.svg')),
  'no-deployments': lazy(() => import('./no-deployments.svg')),
  'no-feedback-given': lazy(() => import('./no-feedback-given.svg')),
  'no-instances': lazy(() => import('./no-instances.svg')),
  nodejs: lazy(() => import('./nodejs.svg')),
  'not-synced': lazy(() => import('./not-synced.svg')),
  notification: lazy(() => import('./notification.svg')),
  'npm-repository-type': lazy(() => import('./npm-repository-type.svg')),
  npm: lazy(() => import('./npm.svg')),
  'nuget-repository-type': lazy(() => import('./nuget-repository-type.svg')),
  'offline-outline': lazy(() => import('./offline-outline.svg')),
  'oidc-authentication': lazy(() => import('./oidc-authentication.svg')),
  'onprem-dark': lazy(() => import('./onprem-dark.svg')),
  'onprem-light': lazy(() => import('./onprem-light.svg')),
  openTofu: lazy(() => import('./openTofu.svg')),
  'openshift-params': lazy(() => import('./openshift-params.svg')),
  openshift: lazy(() => import('./openshift.svg')),
  opsgenie: lazy(() => import('./opsgenie.svg')),
  'options-hollow': lazy(() => import('./options-hollow.svg')),
  'osv-inverse': lazy(() => import('./osv-inverse.svg')),
  osv: lazy(() => import('./osv.svg')),
  'other-workload': lazy(() => import('./other-workload.svg')),
  'owasp-dependency-check-inverse': lazy(() => import('./owasp-dependency-check-inverse.svg')),
  'owasp-inverse': lazy(() => import('./owasp-inverse.svg')),
  owasp: lazy(() => import('./owasp.svg')),
  'pager-duty': lazy(() => import('./pager-duty.svg')),
  'pdc-inverse': lazy(() => import('./pdc-inverse.svg')),
  pdc: lazy(() => import('./pdc.svg')),
  pending: lazy(() => import('./pending.svg')),
  'pipeline-advanced': lazy(() => import('./pipeline-advanced.svg')),
  'pipeline-approval': lazy(() => import('./pipeline-approval.svg')),
  'pipeline-build-select': lazy(() => import('./pipeline-build-select.svg')),
  'pipeline-build': lazy(() => import('./pipeline-build.svg')),
  'pipeline-custom': lazy(() => import('./pipeline-custom.svg')),
  'pipeline-deploy': lazy(() => import('./pipeline-deploy.svg')),
  'pipeline-deployment': lazy(() => import('./pipeline-deployment.svg')),
  'pipeline-executor': lazy(() => import('./pipeline-executor.svg')),
  'pipeline-ng': lazy(() => import('./pipeline-ng.svg')),
  'pipeline-outputs': lazy(() => import('./pipeline-outputs.svg')),
  'pipeline-stage-selection-caret': lazy(() => import('./pipeline-stage-selection-caret.svg')),
  'pipeline-variables': lazy(() => import('./pipeline-variables.svg')),
  pipeline: lazy(() => import('./pipeline.svg')),
  'placeholder-hover': lazy(() => import('./placeholder-hover.svg')),
  'placeholder-selected': lazy(() => import('./placeholder-selected.svg')),
  placeholder: lazy(() => import('./placeholder.svg')),
  'play-circle': lazy(() => import('./play-circle.svg')),
  'play-outline': lazy(() => import('./play-outline.svg')),
  'plugin-ci-step-inverse': lazy(() => import('./plugin-ci-step-inverse.svg')),
  'plugin-ci-step': lazy(() => import('./plugin-ci-step.svg')),
  'plugin-inputs': lazy(() => import('./plugin-inputs.svg')),
  'plugin-step': lazy(() => import('./plugin-step.svg')),
  'pod-withbg': lazy(() => import('./pod-withbg.svg')),
  pod: lazy(() => import('./pod.svg')),
  policies: lazy(() => import('./policies.svg')),
  policysets: lazy(() => import('./policysets.svg')),
  polygon: lazy(() => import('./polygon.svg')),
  'probe-EOT': lazy(() => import('./probe-EOT.svg')),
  'probe-SOT': lazy(() => import('./probe-SOT.svg')),
  'probe-continuos': lazy(() => import('./probe-continuos.svg')),
  'probe-edge': lazy(() => import('./probe-edge.svg')),
  'probe-onChaos': lazy(() => import('./probe-onChaos.svg')),
  profile: lazy(() => import('./profile.svg')),
  'progress-dial': lazy(() => import('./progress-dial.svg')),
  'projects-wizard': lazy(() => import('./projects-wizard.svg')),
  'prowler-inverse': lazy(() => import('./prowler-inverse.svg')),
  prowler: lazy(() => import('./prowler.svg')),
  'prune-skipped': lazy(() => import('./prune-skipped.svg')),
  pruned: lazy(() => import('./pruned.svg')),
  'publish-step': lazy(() => import('./publish-step.svg')),
  'pull-request': lazy(() => import('./pull-request.svg')),
  python: lazy(() => import('./python.svg')),
  question: lazy(() => import('./question.svg')),
  'queue-step': lazy(() => import('./queue-step.svg')),
  queued: lazy(() => import('./queued.svg')),
  rafay: lazy(() => import('./rafay.svg')),
  'rancher-inverse': lazy(() => import('./rancher-inverse.svg')),
  rancher: lazy(() => import('./rancher.svg')),
  're-executed': lazy(() => import('./re-executed.svg')),
  'reg-ex': lazy(() => import('./reg-ex.svg')),
  'register-catalog': lazy(() => import('./register-catalog.svg')),
  'remote-setup': lazy(() => import('./remote-setup.svg')),
  remote: lazy(() => import('./remote.svg')),
  remotefile: lazy(() => import('./remotefile.svg')),
  'remove-graph': lazy(() => import('./remove-graph.svg')),
  'remove-minus': lazy(() => import('./remove-minus.svg')),
  remove: lazy(() => import('./remove.svg')),
  'report-gear-grey': lazy(() => import('./report-gear-grey.svg')),
  'report-gear': lazy(() => import('./report-gear.svg')),
  'report-icon': lazy(() => import('./report-icon.svg')),
  repository: lazy(() => import('./repository.svg')),
  'res-connectors': lazy(() => import('./res-connectors.svg')),
  'res-delegates': lazy(() => import('./res-delegates.svg')),
  'res-environments': lazy(() => import('./res-environments.svg')),
  'res-resourceGroups': lazy(() => import('./res-resourceGroups.svg')),
  'res-roles': lazy(() => import('./res-roles.svg')),
  'res-secrets': lazy(() => import('./res-secrets.svg')),
  'res-userGroups': lazy(() => import('./res-userGroups.svg')),
  'res-users': lazy(() => import('./res-users.svg')),
  'reset-icon': lazy(() => import('./reset-icon.svg')),
  'resource-center-community-icon': lazy(() => import('./resource-center-community-icon.svg')),
  'resource-center-docs-icon': lazy(() => import('./resource-center-docs-icon.svg')),
  'resource-stack-destroy': lazy(() => import('./resource-stack-destroy.svg')),
  'resource-stack-provision': lazy(() => import('./resource-stack-provision.svg')),
  'resource-stack': lazy(() => import('./resource-stack.svg')),
  'resources-icon': lazy(() => import('./resources-icon.svg')),
  resources: lazy(() => import('./resources.svg')),
  'restore-cache-gcs-ci-step-inverse': lazy(() => import('./restore-cache-gcs-ci-step-inverse.svg')),
  'restore-cache-gcs-ci-step': lazy(() => import('./restore-cache-gcs-ci-step.svg')),
  'restore-cache-gcs-step-inverse': lazy(() => import('./restore-cache-gcs-step-inverse.svg')),
  'restore-cache-gcs-step': lazy(() => import('./restore-cache-gcs-step.svg')),
  'restore-cache-gcs': lazy(() => import('./restore-cache-gcs.svg')),
  'restore-cache-harness-ci-step-inverse': lazy(() => import('./restore-cache-harness-ci-step-inverse.svg')),
  'restore-cache-harness-ci-step': lazy(() => import('./restore-cache-harness-ci-step.svg')),
  'restore-cache-s3-ci-step-inverse': lazy(() => import('./restore-cache-s3-ci-step-inverse.svg')),
  'restore-cache-s3-ci-step': lazy(() => import('./restore-cache-s3-ci-step.svg')),
  'restore-cache-s3-step-inverse': lazy(() => import('./restore-cache-s3-step-inverse.svg')),
  'restore-cache-s3-step': lazy(() => import('./restore-cache-s3-step.svg')),
  'restore-cache-s3': lazy(() => import('./restore-cache-s3.svg')),
  'restore-cache-step': lazy(() => import('./restore-cache-step.svg')),
  'retry-step-group': lazy(() => import('./retry-step-group.svg')),
  'right-arrow': lazy(() => import('./right-arrow.svg')),
  'right-bar-notification': lazy(() => import('./right-bar-notification.svg')),
  'right-drawer': lazy(() => import('./right-drawer.svg')),
  roles: lazy(() => import('./roles.svg')),
  'rollback-execution': lazy(() => import('./rollback-execution.svg')),
  'rollback-pipeline-inverse': lazy(() => import('./rollback-pipeline-inverse.svg')),
  'rollback-pipeline': lazy(() => import('./rollback-pipeline.svg')),
  'rollback-service': lazy(() => import('./rollback-service.svg')),
  'rollback-stage-inverse': lazy(() => import('./rollback-stage-inverse.svg')),
  'rollback-stage': lazy(() => import('./rollback-stage.svg')),
  'rolling-inverse': lazy(() => import('./rolling-inverse.svg')),
  'rolling-update': lazy(() => import('./rolling-update.svg')),
  rolling: lazy(() => import('./rolling.svg')),
  rootly: lazy(() => import('./rootly.svg')),
  'run-ci-step-inverse': lazy(() => import('./run-ci-step-inverse.svg')),
  'run-ci-step': lazy(() => import('./run-ci-step.svg')),
  'run-pipeline': lazy(() => import('./run-pipeline.svg')),
  'run-step-plugin': lazy(() => import('./run-step-plugin.svg')),
  'run-step': lazy(() => import('./run-step.svg')),
  'run-task-step': lazy(() => import('./run-task-step.svg')),
  'run-test-step-plugin': lazy(() => import('./run-test-step-plugin.svg')),
  'run-tests-ci-step-inverse': lazy(() => import('./run-tests-ci-step-inverse.svg')),
  'run-tests-ci-step': lazy(() => import('./run-tests-ci-step.svg')),
  'run-tests-step': lazy(() => import('./run-tests-step.svg')),
  'running-filled': lazy(() => import('./running-filled.svg')),
  'runtime-input': lazy(() => import('./runtime-input.svg')),
  's3-ci-step-inverse': lazy(() => import('./s3-ci-step-inverse.svg')),
  's3-ci-step': lazy(() => import('./s3-ci-step.svg')),
  's3-step-inverse': lazy(() => import('./s3-step-inverse.svg')),
  's3-step': lazy(() => import('./s3-step.svg')),
  'sack-dollar': lazy(() => import('./sack-dollar.svg')),
  'save-cache-gcs-ci-step-inverse': lazy(() => import('./save-cache-gcs-ci-step-inverse.svg')),
  'save-cache-gcs-ci-step': lazy(() => import('./save-cache-gcs-ci-step.svg')),
  'save-cache-gcs-step-inverse': lazy(() => import('./save-cache-gcs-step-inverse.svg')),
  'save-cache-gcs-step': lazy(() => import('./save-cache-gcs-step.svg')),
  'save-cache-gcs': lazy(() => import('./save-cache-gcs.svg')),
  'save-cache-harness-ci-step-inverse': lazy(() => import('./save-cache-harness-ci-step-inverse.svg')),
  'save-cache-harness-ci-step': lazy(() => import('./save-cache-harness-ci-step.svg')),
  'save-cache-s3-ci-step-inverse': lazy(() => import('./save-cache-s3-ci-step-inverse.svg')),
  'save-cache-s3-ci-step': lazy(() => import('./save-cache-s3-ci-step.svg')),
  'save-cache-s3-step-inverse': lazy(() => import('./save-cache-s3-step-inverse.svg')),
  'save-cache-s3-step': lazy(() => import('./save-cache-s3-step.svg')),
  'save-cache-s3': lazy(() => import('./save-cache-s3.svg')),
  'save-cache-step': lazy(() => import('./save-cache-step.svg')),
  'sbom-drift-detected': lazy(() => import('./sbom-drift-detected.svg')),
  scm: lazy(() => import('./scm.svg')),
  script: lazy(() => import('./script.svg')),
  'search-applications': lazy(() => import('./search-applications.svg')),
  'search-connectors': lazy(() => import('./search-connectors.svg')),
  'search-environments': lazy(() => import('./search-environments.svg')),
  'search-infra-prov': lazy(() => import('./search-infra-prov.svg')),
  'search-list': lazy(() => import('./search-list.svg')),
  'search-pipelines': lazy(() => import('./search-pipelines.svg')),
  'search-services': lazy(() => import('./search-services.svg')),
  'search-tips': lazy(() => import('./search-tips.svg')),
  'search-triggers': lazy(() => import('./search-triggers.svg')),
  'search-user-groups': lazy(() => import('./search-user-groups.svg')),
  'search-users': lazy(() => import('./search-users.svg')),
  'search-workflow': lazy(() => import('./search-workflow.svg')),
  'secret-manager': lazy(() => import('./secret-manager.svg')),
  'secret-ssh': lazy(() => import('./secret-ssh.svg')),
  'secrets-blue': lazy(() => import('./secrets-blue.svg')),
  'secrets-icon': lazy(() => import('./secrets-icon.svg')),
  'security-ci-step-inverse': lazy(() => import('./security-ci-step-inverse.svg')),
  'security-ci-step': lazy(() => import('./security-ci-step.svg')),
  'security-stage': lazy(() => import('./security-stage.svg')),
  'sei-main': lazy(() => import('./sei-main.svg')),
  'sei-with-dark-text': lazy(() => import('./sei-with-dark-text.svg')),
  'select-scope': lazy(() => import('./select-scope.svg')),
  semgrep: lazy(() => import('./semgrep.svg')),
  'send-data': lazy(() => import('./send-data.svg')),
  'serverless-aws-lambda-deploy-v2-inverse': lazy(() => import('./serverless-aws-lambda-deploy-v2-inverse.svg')),
  'serverless-aws-lambda-deploy-v2': lazy(() => import('./serverless-aws-lambda-deploy-v2.svg')),
  'serverless-aws-lambda-package-inverse': lazy(() => import('./serverless-aws-lambda-package-inverse.svg')),
  'serverless-aws-lambda-package': lazy(() => import('./serverless-aws-lambda-package.svg')),
  'serverless-aws-lambda-prepare-rollback-inverse': lazy(
    () => import('./serverless-aws-lambda-prepare-rollback-inverse.svg')
  ),
  'serverless-aws-lambda-prepare-rollback': lazy(() => import('./serverless-aws-lambda-prepare-rollback.svg')),
  'serverless-aws-lambda-rollback-v2-inverse': lazy(() => import('./serverless-aws-lambda-rollback-v2-inverse.svg')),
  'serverless-aws-lambda-rollback-v2': lazy(() => import('./serverless-aws-lambda-rollback-v2.svg')),
  'serverless-deploy-step': lazy(() => import('./serverless-deploy-step.svg')),
  'service-accounts': lazy(() => import('./service-accounts.svg')),
  'service-amazon-ecs': lazy(() => import('./service-amazon-ecs.svg')),
  'service-ami': lazy(() => import('./service-ami.svg')),
  'service-ansible': lazy(() => import('./service-ansible.svg')),
  'service-appdynamics': lazy(() => import('./service-appdynamics.svg')),
  'service-artifactory-ci-step-inverse': lazy(() => import('./service-artifactory-ci-step-inverse.svg')),
  'service-artifactory-ci-step': lazy(() => import('./service-artifactory-ci-step.svg')),
  'service-artifactory-inverse': lazy(() => import('./service-artifactory-inverse.svg')),
  'service-artifactory': lazy(() => import('./service-artifactory.svg')),
  'service-aws-ccm': lazy(() => import('./service-aws-ccm.svg')),
  'service-aws-code-deploy': lazy(() => import('./service-aws-code-deploy.svg')),
  'service-aws-lamda': lazy(() => import('./service-aws-lamda.svg')),
  'service-aws-native-lambda': lazy(() => import('./service-aws-native-lambda.svg')),
  'service-aws-sam': lazy(() => import('./service-aws-sam.svg')),
  'service-aws': lazy(() => import('./service-aws.svg')),
  'service-azdevops': lazy(() => import('./service-azdevops.svg')),
  'service-azure-artifact-connector': lazy(() => import('./service-azure-artifact-connector.svg')),
  'service-azure-artifacts': lazy(() => import('./service-azure-artifacts.svg')),
  'service-azure-ccm': lazy(() => import('./service-azure-ccm.svg')),
  'service-azure-functions': lazy(() => import('./service-azure-functions.svg')),
  'service-azure': lazy(() => import('./service-azure.svg')),
  'service-bamboo': lazy(() => import('./service-bamboo.svg')),
  'service-bugsnag': lazy(() => import('./service-bugsnag.svg')),
  'service-cdk': lazy(() => import('./service-cdk.svg')),
  'service-circleci': lazy(() => import('./service-circleci.svg')),
  'service-cloudformation': lazy(() => import('./service-cloudformation.svg')),
  'service-cloudwatch': lazy(() => import('./service-cloudwatch.svg')),
  'service-custom-connector': lazy(() => import('./service-custom-connector.svg')),
  'service-datadog': lazy(() => import('./service-datadog.svg')),
  'service-deployment': lazy(() => import('./service-deployment.svg')),
  'service-dockerhub': lazy(() => import('./service-dockerhub.svg')),
  'service-dynatrace': lazy(() => import('./service-dynatrace.svg')),
  'service-ec2': lazy(() => import('./service-ec2.svg')),
  'service-ecs': lazy(() => import('./service-ecs.svg')),
  'service-elastigroup': lazy(() => import('./service-elastigroup.svg')),
  'service-elk': lazy(() => import('./service-elk.svg')),
  'service-gar': lazy(() => import('./service-gar.svg')),
  'service-gcp-ccm': lazy(() => import('./service-gcp-ccm.svg')),
  'service-gcp-with-text': lazy(() => import('./service-gcp-with-text.svg')),
  'service-gcp': lazy(() => import('./service-gcp.svg')),
  'service-github-package': lazy(() => import('./service-github-package.svg')),
  'service-github': lazy(() => import('./service-github.svg')),
  'service-google-functions': lazy(() => import('./service-google-functions.svg')),
  'service-gotlab': lazy(() => import('./service-gotlab.svg')),
  'service-grafana-loki': lazy(() => import('./service-grafana-loki.svg')),
  'service-helm': lazy(() => import('./service-helm.svg')),
  'service-instana': lazy(() => import('./service-instana.svg')),
  'service-jenkins-inverse': lazy(() => import('./service-jenkins-inverse.svg')),
  'service-jenkins': lazy(() => import('./service-jenkins.svg')),
  'service-jira-inverse': lazy(() => import('./service-jira-inverse.svg')),
  'service-jira': lazy(() => import('./service-jira.svg')),
  'service-kubernetes-ccm': lazy(() => import('./service-kubernetes-ccm.svg')),
  'service-kubernetes-quick': lazy(() => import('./service-kubernetes-quick.svg')),
  'service-kubernetes': lazy(() => import('./service-kubernetes.svg')),
  'service-linux': lazy(() => import('./service-linux.svg')),
  'service-microsoft-teams': lazy(() => import('./service-microsoft-teams.svg')),
  'service-mongodb': lazy(() => import('./service-mongodb.svg')),
  'service-msteams': lazy(() => import('./service-msteams.svg')),
  'service-mydatacenter': lazy(() => import('./service-mydatacenter.svg')),
  'service-newrelic': lazy(() => import('./service-newrelic.svg')),
  'service-nexus': lazy(() => import('./service-nexus.svg')),
  'service-ogz': lazy(() => import('./service-ogz.svg')),
  'service-okta': lazy(() => import('./service-okta.svg')),
  'service-onelogin': lazy(() => import('./service-onelogin.svg')),
  'service-openstack': lazy(() => import('./service-openstack.svg')),
  'service-pagerduty': lazy(() => import('./service-pagerduty.svg')),
  'service-pivotal': lazy(() => import('./service-pivotal.svg')),
  'service-prometheus': lazy(() => import('./service-prometheus.svg')),
  'service-pulumi': lazy(() => import('./service-pulumi.svg')),
  'service-redis': lazy(() => import('./service-redis.svg')),
  'service-serverless-aws': lazy(() => import('./service-serverless-aws.svg')),
  'service-serverless-azure': lazy(() => import('./service-serverless-azure.svg')),
  'service-serverless-gcp': lazy(() => import('./service-serverless-gcp.svg')),
  'service-serverless': lazy(() => import('./service-serverless.svg')),
  'service-service-s3': lazy(() => import('./service-service-s3.svg')),
  'service-servicenow-inverse': lazy(() => import('./service-servicenow-inverse.svg')),
  'service-servicenow': lazy(() => import('./service-servicenow.svg')),
  'service-signalfx': lazy(() => import('./service-signalfx.svg')),
  'service-slack': lazy(() => import('./service-slack.svg')),
  'service-splunk-with-name': lazy(() => import('./service-splunk-with-name.svg')),
  'service-splunk': lazy(() => import('./service-splunk.svg')),
  'service-spotinst': lazy(() => import('./service-spotinst.svg')),
  'service-stackdriver': lazy(() => import('./service-stackdriver.svg')),
  'service-sumologic': lazy(() => import('./service-sumologic.svg')),
  'service-terraform': lazy(() => import('./service-terraform.svg')),
  'service-terragrunt': lazy(() => import('./service-terragrunt.svg')),
  'service-vm': lazy(() => import('./service-vm.svg')),
  'service-vmware': lazy(() => import('./service-vmware.svg')),
  'service-windows': lazy(() => import('./service-windows.svg')),
  service: lazy(() => import('./service.svg')),
  'servicenow-approve-inverse': lazy(() => import('./servicenow-approve-inverse.svg')),
  'servicenow-approve': lazy(() => import('./servicenow-approve.svg')),
  'servicenow-create-inverse': lazy(() => import('./servicenow-create-inverse.svg')),
  'servicenow-create': lazy(() => import('./servicenow-create.svg')),
  'servicenow-update-inverse': lazy(() => import('./servicenow-update-inverse.svg')),
  'servicenow-update': lazy(() => import('./servicenow-update.svg')),
  services: lazy(() => import('./services.svg')),
  setting: lazy(() => import('./setting.svg')),
  'setup-api': lazy(() => import('./setup-api.svg')),
  'setup-client': lazy(() => import('./setup-client.svg')),
  'setup-tags': lazy(() => import('./setup-tags.svg')),
  'shield-gears': lazy(() => import('./shield-gears.svg')),
  'simple-verification': lazy(() => import('./simple-verification.svg')),
  skipped: lazy(() => import('./skipped.svg')),
  'slider-trigger': lazy(() => import('./slider-trigger.svg')),
  'slo-downtime': lazy(() => import('./slo-downtime.svg')),
  slo: lazy(() => import('./slo.svg')),
  'slot-deployment': lazy(() => import('./slot-deployment.svg')),
  'slsa-generation': lazy(() => import('./slsa-generation.svg')),
  'slsa-verification': lazy(() => import('./slsa-verification.svg')),
  slsa: lazy(() => import('./slsa.svg')),
  'smtp-configuration-blue': lazy(() => import('./smtp-configuration-blue.svg')),
  smtp: lazy(() => import('./smtp.svg')),
  'solid-error': lazy(() => import('./solid-error.svg')),
  spinner: lazy(() => import('./spinner.svg')),
  'spot-inverse': lazy(() => import('./spot-inverse.svg')),
  spot: lazy(() => import('./spot.svg')),
  'srm-with-dark-text': lazy(() => import('./srm-with-dark-text.svg')),
  'ssca-artifacts': lazy(() => import('./ssca-artifacts.svg')),
  'ssca-components': lazy(() => import('./ssca-components.svg')),
  'ssca-enforce': lazy(() => import('./ssca-enforce.svg')),
  'ssca-main': lazy(() => import('./ssca-main.svg')),
  'ssca-orchestrate': lazy(() => import('./ssca-orchestrate.svg')),
  'ssca-remediation': lazy(() => import('./ssca-remediation.svg')),
  'ssl-cert': lazy(() => import('./ssl-cert.svg')),
  'stale-cache': lazy(() => import('./stale-cache.svg')),
  'star-empty': lazy(() => import('./star-empty.svg')),
  star: lazy(() => import('./star.svg')),
  stars: lazy(() => import('./stars.svg')),
  'status-pending': lazy(() => import('./status-pending.svg')),
  'status-running': lazy(() => import('./status-running.svg')),
  'status-upgrade': lazy(() => import('./status-upgrade.svg')),
  'step-flash': lazy(() => import('./step-flash.svg')),
  'step-group': lazy(() => import('./step-group.svg')),
  'step-jira': lazy(() => import('./step-jira.svg')),
  'step-kubernetes': lazy(() => import('./step-kubernetes.svg')),
  'steps-spinner': lazy(() => import('./steps-spinner.svg')),
  'sto-color-filled': lazy(() => import('./sto-color-filled.svg')),
  'sto-containers': lazy(() => import('./sto-containers.svg')),
  'sto-dast': lazy(() => import('./sto-dast.svg')),
  'sto-grey': lazy(() => import('./sto-grey.svg')),
  'sto-sast': lazy(() => import('./sto-sast.svg')),
  'sto-sca': lazy(() => import('./sto-sca.svg')),
  'sto-secrets': lazy(() => import('./sto-secrets.svg')),
  'sto-with-dark-text': lazy(() => import('./sto-with-dark-text.svg')),
  'sto-with-text': lazy(() => import('./sto-with-text.svg')),
  'store-artifact-bundle': lazy(() => import('./store-artifact-bundle.svg')),
  subscriptions: lazy(() => import('./subscriptions.svg')),
  'success-tick': lazy(() => import('./success-tick.svg')),
  'support-account': lazy(() => import('./support-account.svg')),
  'support-api': lazy(() => import('./support-api.svg')),
  'support-code': lazy(() => import('./support-code.svg')),
  'support-dashboard': lazy(() => import('./support-dashboard.svg')),
  'support-deployment': lazy(() => import('./support-deployment.svg')),
  'support-gitops': lazy(() => import('./support-gitops.svg')),
  'support-onprem': lazy(() => import('./support-onprem.svg')),
  'support-pipeline': lazy(() => import('./support-pipeline.svg')),
  'support-security': lazy(() => import('./support-security.svg')),
  'support-start': lazy(() => import('./support-start.svg')),
  'support-tour': lazy(() => import('./support-tour.svg')),
  'support-troubleshoot': lazy(() => import('./support-troubleshoot.svg')),
  'support-verification': lazy(() => import('./support-verification.svg')),
  'support-videos': lazy(() => import('./support-videos.svg')),
  'swap-services': lazy(() => import('./swap-services.svg')),
  'switch-off': lazy(() => import('./switch-off.svg')),
  'switch-on': lazy(() => import('./switch-on.svg')),
  'sync-failed': lazy(() => import('./sync-failed.svg')),
  synced: lazy(() => import('./synced.svg')),
  syncing: lazy(() => import('./syncing.svg')),
  sysdig: lazy(() => import('./sysdig.svg')),
  tanzuCommand: lazy(() => import('./tanzuCommand.svg')),
  'target-management': lazy(() => import('./target-management.svg')),
  target: lazy(() => import('./target.svg')),
  'tas-inverse': lazy(() => import('./tas-inverse.svg')),
  'tas-manifest': lazy(() => import('./tas-manifest.svg')),
  'tas-pre-processing-artifact-group': lazy(() => import('./tas-pre-processing-artifact-group.svg')),
  'tas-pre-processing-artifact': lazy(() => import('./tas-pre-processing-artifact.svg')),
  tas: lazy(() => import('./tas.svg')),
  tasAppResize: lazy(() => import('./tasAppResize.svg')),
  tasBGSetup: lazy(() => import('./tasBGSetup.svg')),
  tasBasicSetup: lazy(() => import('./tasBasicSetup.svg')),
  tasCanarySetup: lazy(() => import('./tasCanarySetup.svg')),
  tasMapRoute: lazy(() => import('./tasMapRoute.svg')),
  tasRollback: lazy(() => import('./tasRollback.svg')),
  tasRollingSetup: lazy(() => import('./tasRollingSetup.svg')),
  tasSwapRollback: lazy(() => import('./tasSwapRollback.svg')),
  tasSwapRoute: lazy(() => import('./tasSwapRoute.svg')),
  tasUnMapRoute: lazy(() => import('./tasUnMapRoute.svg')),
  'template-inputs': lazy(() => import('./template-inputs.svg')),
  'template-library': lazy(() => import('./template-library.svg')),
  'templates-blue': lazy(() => import('./templates-blue.svg')),
  'templates-icon': lazy(() => import('./templates-icon.svg')),
  terminal: lazy(() => import('./terminal.svg')),
  'terraform-apply-inverse': lazy(() => import('./terraform-apply-inverse.svg')),
  'terraform-apply-new': lazy(() => import('./terraform-apply-new.svg')),
  'terraform-apply': lazy(() => import('./terraform-apply.svg')),
  'terraform-cloud-rollback-inverse': lazy(() => import('./terraform-cloud-rollback-inverse.svg')),
  'terraform-cloud-rollback': lazy(() => import('./terraform-cloud-rollback.svg')),
  'terraform-cloud-run-inverse': lazy(() => import('./terraform-cloud-run-inverse.svg')),
  'terraform-cloud-run': lazy(() => import('./terraform-cloud-run.svg')),
  'terraform-cloud': lazy(() => import('./terraform-cloud.svg')),
  'terraform-complicance': lazy(() => import('./terraform-complicance.svg')),
  'terraform-destroy-inverse': lazy(() => import('./terraform-destroy-inverse.svg')),
  'terraform-destroy': lazy(() => import('./terraform-destroy.svg')),
  'terraform-plan-inverse': lazy(() => import('./terraform-plan-inverse.svg')),
  'terraform-plan': lazy(() => import('./terraform-plan.svg')),
  'terraform-rollback-inverse': lazy(() => import('./terraform-rollback-inverse.svg')),
  'terraform-rollback': lazy(() => import('./terraform-rollback.svg')),
  'terragrunt-apply-inverse': lazy(() => import('./terragrunt-apply-inverse.svg')),
  'terragrunt-apply': lazy(() => import('./terragrunt-apply.svg')),
  'terragrunt-destroy-inverse': lazy(() => import('./terragrunt-destroy-inverse.svg')),
  'terragrunt-destroy': lazy(() => import('./terragrunt-destroy.svg')),
  'terragrunt-plan-inverse': lazy(() => import('./terragrunt-plan-inverse.svg')),
  'terragrunt-plan': lazy(() => import('./terragrunt-plan.svg')),
  'terragrunt-rollback-inverse': lazy(() => import('./terragrunt-rollback-inverse.svg')),
  'terragrunt-rollback': lazy(() => import('./terragrunt-rollback.svg')),
  'test-connection': lazy(() => import('./test-connection.svg')),
  'test-verification': lazy(() => import('./test-verification.svg')),
  text: lazy(() => import('./text.svg')),
  tfsec: lazy(() => import('./tfsec.svg')),
  'thinner-code-repos': lazy(() => import('./thinner-code-repos.svg')),
  'thinner-code-webhook': lazy(() => import('./thinner-code-webhook.svg')),
  'thinner-search': lazy(() => import('./thinner-search.svg')),
  'ti-callgraph': lazy(() => import('./ti-callgraph.svg')),
  timeout: lazy(() => import('./timeout.svg')),
  timer: lazy(() => import('./timer.svg')),
  'todo-list-harness': lazy(() => import('./todo-list-harness.svg')),
  todo: lazy(() => import('./todo.svg')),
  'tooltip-icon': lazy(() => import('./tooltip-icon.svg')),
  'traffic-lights': lazy(() => import('./traffic-lights.svg')),
  'trigger-artifact': lazy(() => import('./trigger-artifact.svg')),
  'trigger-execution': lazy(() => import('./trigger-execution.svg')),
  'trigger-github': lazy(() => import('./trigger-github.svg')),
  'trigger-pipeline': lazy(() => import('./trigger-pipeline.svg')),
  'trigger-schedule': lazy(() => import('./trigger-schedule.svg')),
  'trigger-stack': lazy(() => import('./trigger-stack.svg')),
  union: lazy(() => import('./union.svg')),
  university: lazy(() => import('./university.svg')),
  up: lazy(() => import('./up.svg')),
  'update-app': lazy(() => import('./update-app.svg')),
  'upgrade-bolt': lazy(() => import('./upgrade-bolt.svg')),
  'upload-box': lazy(() => import('./upload-box.svg')),
  'upstream-proxies-icon': lazy(() => import('./upstream-proxies-icon.svg')),
  'user-groups': lazy(() => import('./user-groups.svg')),
  user: lazy(() => import('./user.svg')),
  utility: lazy(() => import('./utility.svg')),
  valuesFIle: lazy(() => import('./valuesFIle.svg')),
  variable: lazy(() => import('./variable.svg')),
  'variables-blue': lazy(() => import('./variables-blue.svg')),
  variables: lazy(() => import('./variables.svg')),
  'view-json': lazy(() => import('./view-json.svg')),
  viewerRole: lazy(() => import('./viewerRole.svg')),
  waiting: lazy(() => import('./waiting.svg')),
  'warning-icon': lazy(() => import('./warning-icon.svg')),
  'warning-outline': lazy(() => import('./warning-outline.svg')),
  webhook: lazy(() => import('./webhook.svg')),
  'white-cluster': lazy(() => import('./white-cluster.svg')),
  'white-full-cluster': lazy(() => import('./white-full-cluster.svg')),
  'wiggly-arrow': lazy(() => import('./wiggly-arrow.svg')),
  wiz: lazy(() => import('./wiz.svg')),
  x: lazy(() => import('./x.svg')),
  'yaml-builder-env': lazy(() => import('./yaml-builder-env.svg')),
  'yaml-builder-input-sets': lazy(() => import('./yaml-builder-input-sets.svg')),
  'yaml-builder-notifications': lazy(() => import('./yaml-builder-notifications.svg')),
  'yaml-builder-stages': lazy(() => import('./yaml-builder-stages.svg')),
  'yaml-builder-steps': lazy(() => import('./yaml-builder-steps.svg')),
  'yaml-builder-trigger': lazy(() => import('./yaml-builder-trigger.svg')),
  'zoom-in': lazy(() => import('./zoom-in.svg')),
  'zoom-out': lazy(() => import('./zoom-out.svg'))
}

export { HarnessIcons, HarnessIconName }
