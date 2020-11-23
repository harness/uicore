import { FunctionComponent, ElementType } from 'react'
import { KVO } from 'core/Types'
import Edit from './Edit.svg'
import Options from './Options.svg'
import Activity from './activity.svg'
import AppAwsCodeDeploy from './app-aws-code-deploy.svg'
import AppAwsLambda from './app-aws-lambda.svg'
import AppKubernetes from './app-kubernetes.svg'
import ApprovalStep from './approval-step.svg'
import AzureKubernetesService from './azure-kubernetes-service.svg'
import Bitbucket from './bitbucket.svg'
import BlueBlackCluster from './blue-black-cluster.svg'
import Bluegreen from './bluegreen.svg'
import BudgetAlertLight from './budget-alert-light.svg'
import CanaryOutline from './canary-outline.svg'
import Canary from './canary.svg'
import CanvasPosition from './canvas-position.svg'
import CanvasReset from './canvas-reset.svg'
import CanvasSelector from './canvas-selector.svg'
import CdHover from './cd-hover.svg'
import CdMain from './cd-main.svg'
import CeApplication from './ce-application.svg'
import CeBeta from './ce-beta.svg'
import CeBudgetColored from './ce-budget_colored.svg'
import CeBudgetGrey from './ce-budget_grey.svg'
import CeCloud from './ce-cloud.svg'
import CeCluster from './ce-cluster.svg'
import CeHover from './ce-hover.svg'
import CeMainColored from './ce-main-colored.svg'
import CeMainGrey from './ce-main-grey.svg'
import CeMain from './ce-main.svg'
import CfHover from './cf-hover.svg'
import CfMain from './cf-main.svg'
import CheckAlt from './check-alt.svg'
import Check from './check.svg'
import CiHover from './ci-hover.svg'
import CiMain from './ci-main.svg'
import CommandApproval from './command-approval.svg'
import CommandArtifactCheck from './command-artifact-check.svg'
import CommandBarrier from './command-barrier.svg'
import CommandCalendar from './command-calendar.svg'
import CommandEcho from './command-echo.svg'
import CommandEmail from './command-email.svg'
import CommandHttp from './command-http.svg'
import CommandIcon from './command-icon.svg'
import CommandInstall from './command-install.svg'
import CommandResourceConstraint from './command-resource-constraint.svg'
import CommandRollback from './command-rollback.svg'
import CommandShellScript from './command-shell-script.svg'
import CommandStart from './command-start.svg'
import CommandStop from './command-stop.svg'
import CommandSwap from './command-swap.svg'
import CommandSwitch from './command-switch.svg'
import CommandWinrm from './command-winrm.svg'
import ConditionalSkipFilled from './conditional-skip-filled.svg'
import ConditionalSkip from './conditional-skip.svg'
import Copy from './copy.svg'
import CsHover from './cs-hover.svg'
import CustomService from './custom-service.svg'
import CvHover from './cv-hover.svg'
import CvMain from './cv-main.svg'
import DashboardSelected from './dashboard-selected.svg'
import Dashboard from './dashboard.svg'
import DependencyStep from './dependency-step.svg'
import DeploymentAbortedLegacy from './deployment-aborted-legacy.svg'
import DeploymentAbortedNew from './deployment-aborted-new.svg'
import DeploymentFailedLegacy from './deployment-failed-legacy.svg'
import DeploymentFailedNew from './deployment-failed-new.svg'
import DeploymentIncompleteLegacy from './deployment-incomplete-legacy.svg'
import DeploymentIncompleteNew from './deployment-incomplete-new.svg'
import DeploymentInprogressLegacy from './deployment-inprogress-legacy.svg'
import DeploymentInprogressNew from './deployment-inprogress-new.svg'
import DeploymentPausedLegacy from './deployment-paused-legacy.svg'
import DeploymentPausedNew from './deployment-paused-new.svg'
import DeploymentQueuedLegacy from './deployment-queued-legacy.svg'
import DeploymentQueuedNew from './deployment-queued-new.svg'
import DeploymentRejectedLegacy from './deployment-rejected-legacy.svg'
import DeploymentRejectedNew from './deployment-rejected-new.svg'
import DeploymentSuccessLegacy from './deployment-success-legacy.svg'
import DeploymentSuccessNew from './deployment-success-new.svg'
import DeploymentTimeoutLegacy from './deployment-timeout-legacy.svg'
import DeploymentTimeoutNew from './deployment-timeout-new.svg'
import DockerHubStep from './docker-hub-step.svg'
import Down from './down.svg'
import EcrStep from './ecr-step.svg'
import ElasticKubernetesService from './elastic-kubernetes-service.svg'
import EmailStep from './email-step.svg'
import ExecutionAbort from './execution-abort.svg'
import ExecutionInput from './execution-input.svg'
import ExecutionRollback from './execution-rollback.svg'
import ExecutionSuccess from './execution-success.svg'
import ExecutionWarning from './execution-warning.svg'
import ExpressionInput from './expression-input.svg'
import FeedbackGiven from './feedback-given.svg'
import FixedInput from './fixed-input.svg'
import Functions from './functions.svg'
import GcrStep from './gcr-step.svg'
import GcsStep from './gcs-step.svg'
import Gear from './gear.svg'
import GitCloneStep from './git-clone-step.svg'
import Github from './github.svg'
import GoogleKubernetesEngine from './google-kubernetes-engine.svg'
import GreyCluster from './grey-cluster.svg'
import HarnessLogoBlack from './harness-logo-black.svg'
import HarnessLogoWhite from './harness-logo-white.svg'
import Harness from './harness.svg'
import Health from './health.svg'
import Hourglass from './hourglass.svg'
import HttpStep from './http-step.svg'
import Info from './info.svg'
import InitializeStep from './initialize-step.svg'
import Integration from './integration.svg'
import KeyMain from './key-main.svg'
import Key from './key.svg'
import LayoutBottom from './layout-bottom.svg'
import LayoutFloat from './layout-float.svg'
import LayoutRight from './layout-right.svg'
import ListEntityInfographic from './list-entity-infographic.svg'
import MainAbort from './main-abort.svg'
import MainAccountNotifications from './main-account-notifications.svg'
import MainAdd from './main-add.svg'
import MainApplications from './main-applications.svg'
import MainApply from './main-apply.svg'
import MainBaseline from './main-baseline.svg'
import MainCalendar from './main-calendar.svg'
import MainCanary from './main-canary.svg'
import MainCaretDown from './main-caret-down.svg'
import MainCaretLeft from './main-caret-left.svg'
import MainCaretRight from './main-caret-right.svg'
import MainCaretUp from './main-caret-up.svg'
import MainChangelog from './main-changelog.svg'
import MainChevronDown from './main-chevron-down.svg'
import MainChevronLeft from './main-chevron-left.svg'
import MainChevronRight from './main-chevron-right.svg'
import MainChevronUp from './main-chevron-up.svg'
import MainClone from './main-clone.svg'
import MainClose from './main-close.svg'
import MainCloudProviders from './main-cloud-providers.svg'
import MainCloud from './main-cloud.svg'
import MainCodeYaml from './main-code-yaml.svg'
import MainDashboard from './main-dashboard.svg'
import MainDelegates from './main-delegates.svg'
import MainDelete from './main-delete.svg'
import MainDepricate from './main-depricate.svg'
import MainDestroy from './main-destroy.svg'
import MainDownload from './main-download.svg'
import MainEdit from './main-edit.svg'
import MainEmail from './main-email.svg'
import MainEnvironments from './main-environments.svg'
import MainFeedback from './main-feedback.svg'
import MainFilter from './main-filter.svg'
import MainFlag from './main-flag.svg'
import MainFolderNew from './main-folder-new.svg'
import MainFolderOpen from './main-folder-open.svg'
import MainFolder from './main-folder.svg'
import MainFullscreen from './main-fullscreen.svg'
import MainHelp from './main-help.svg'
import MainInfo from './main-info.svg'
import MainInfrastructureProvisioners from './main-infrastructure-provisioners.svg'
import MainIssueFilled from './main-issue-filled.svg'
import MainIssue from './main-issue.svg'
import MainLike from './main-like.svg'
import MainLink from './main-link.svg'
import MainList from './main-list.svg'
import MainListenerUpdate from './main-listener-update.svg'
import MainLock from './main-lock.svg'
import MainMainZoomIn from './main-main-zoom_in.svg'
import MainMaximize from './main-maximize.svg'
import MainMinimize from './main-minimize.svg'
import MainMore from './main-more.svg'
import MainMove from './main-move.svg'
import MainNotes from './main-notes.svg'
import MainNotifications from './main-notifications.svg'
import MainPause from './main-pause.svg'
import MainPipelines from './main-pipelines.svg'
import MainPopularity from './main-popularity.svg'
import MainRefresh from './main-refresh.svg'
import MainReorder from './main-reorder.svg'
import MainRerun from './main-rerun.svg'
import MainResume from './main-resume.svg'
import MainRollback from './main-rollback.svg'
import MainSaved from './main-saved.svg'
import MainScope from './main-scope.svg'
import MainSearch from './main-search.svg'
import MainServiceAmi from './main-service-ami.svg'
import MainServices from './main-services.svg'
import MainSetup from './main-setup.svg'
import MainShare from './main-share.svg'
import MainStart from './main-start.svg'
import MainTags from './main-tags.svg'
import MainTemplateLibrary from './main-template-library.svg'
import MainThumbsdown from './main-thumbsdown.svg'
import MainThumbsup from './main-thumbsup.svg'
import MainTrash from './main-trash.svg'
import MainUnlock from './main-unlock.svg'
import MainUpload from './main-upload.svg'
import MainUserGroups from './main-user-groups.svg'
import MainUser from './main-user.svg'
import MainView from './main-view.svg'
import MainWarning from './main-warning.svg'
import MainWorkflows from './main-workflows.svg'
import MainZoomOut from './main-zoom-out.svg'
import MultiService from './multi-service.svg'
import NavAccountAdminHover from './nav-account-admin-hover.svg'
import NavAccountAdminSelected from './nav-account-admin-selected.svg'
import NavAccountAdmin from './nav-account-admin.svg'
import NavCdHover from './nav-cd-hover.svg'
import NavCdSelected from './nav-cd-selected.svg'
import NavCd from './nav-cd.svg'
import NavCvHover from './nav-cv-hover.svg'
import NavCvSelected from './nav-cv-selected.svg'
import NavCv from './nav-cv.svg'
import NavDashboardHover from './nav-dashboard-hover.svg'
import NavDashboardSelected from './nav-dashboard-selected.svg'
import NavDashboard from './nav-dashboard.svg'
import NavDeploymentsHover from './nav-deployments-hover.svg'
import NavDeploymentsSelected from './nav-deployments-selected.svg'
import NavDeployments from './nav-deployments.svg'
import NavGitSync from './nav-git-sync.svg'
import NavGovernanceHover from './nav-governance-hover.svg'
import NavGovernanceSelected from './nav-governance-selected.svg'
import NavGovernance from './nav-governance.svg'
import NavHarnessHover from './nav-harness-hover.svg'
import NavHarnessSelected from './nav-harness-selected.svg'
import NavHarness from './nav-harness.svg'
import NavInfrastructureHover from './nav-infrastructure-hover.svg'
import NavInfrastructureSelected from './nav-infrastructure-selected.svg'
import NavOrganizationHover from './nav-organization-hover.svg'
import NavOrganizationSelected from './nav-organization-selected.svg'
import NavPipelinesHover from './nav-pipelines-hover.svg'
import NavPipelinesSelected from './nav-pipelines-selected.svg'
import NavPipelines from './nav-pipelines.svg'
import NavProjectHover from './nav-project-hover.svg'
import NavProjectSelected from './nav-project-selected.svg'
import NavProject from './nav-project.svg'
import NavResourcesHover from './nav-resources-hover.svg'
import NavResourcesSelected from './nav-resources-selected.svg'
import NavResources from './nav-resources.svg'
import NavSettingsHover from './nav-settings-hover.svg'
import NavSettingsSelected from './nav-settings-selected.svg'
import NavSettings from './nav-settings.svg'
import NavUserProfileHover from './nav-user-profile-hover.svg'
import NavUserProfileSelected from './nav-user-profile-selected.svg'
import NavUserProfile from './nav-user-profile.svg'
import NewDecoration from './new-decoration.svg'
import NgFilter from './ng-filter.svg'
import NoFeedbackGiven from './no-feedback-given.svg'
import Notification from './notification.svg'
import OtherWorkload from './other-workload.svg'
import Pending from './pending.svg'
import PipelineApproval from './pipeline-approval.svg'
import PipelineBuildSelect from './pipeline-build-select.svg'
import PipelineBuild from './pipeline-build.svg'
import PipelineCustom from './pipeline-custom.svg'
import PipelineDeploy from './pipeline-deploy.svg'
import PipelineNg from './pipeline-ng.svg'
import PipelineStageSelectionCaret from './pipeline-stage-selection-caret.svg'
import PipelineVariables from './pipeline-variables.svg'
import Pipeline from './pipeline.svg'
import PlaceholderHover from './placeholder-hover.svg'
import PlaceholderSelected from './placeholder-selected.svg'
import Placeholder from './placeholder.svg'
import PluginStep from './plugin-step.svg'
import Polygon from './polygon.svg'
import Profile from './profile.svg'
import PublishStep from './publish-step.svg'
import Question from './question.svg'
import Remove from './remove.svg'
import ReportIcon from './report-icon.svg'
import ResourcesIcon from './resources-icon.svg'
import RestoreCacheStep from './restore-cache-step.svg'
import Rolling from './rolling.svg'
import RunPipeline from './run-pipeline.svg'
import RunStep from './run-step.svg'
import RuntimeInput from './runtime-input.svg'
import SaveCacheStep from './save-cache-step.svg'
import SearchApplications from './search-applications.svg'
import SearchConnectors from './search-connectors.svg'
import SearchEnvironments from './search-environments.svg'
import SearchInfraProv from './search-infra-prov.svg'
import SearchPipelines from './search-pipelines.svg'
import SearchServices from './search-services.svg'
import SearchTips from './search-tips.svg'
import SearchTriggers from './search-triggers.svg'
import SearchUserGroups from './search-user-groups.svg'
import SearchUsers from './search-users.svg'
import SearchWorkflow from './search-workflow.svg'
import SecretManager from './secret-manager.svg'
import SecretSsh from './secret-ssh.svg'
import ServiceAppdynamics from './service-appdynamics.svg'
import ServiceArtifactory from './service-artifactory.svg'
import ServiceAwsCodeDeploy from './service-aws-code-deploy.svg'
import ServiceAwsLamda from './service-aws-lamda.svg'
import ServiceAws from './service-aws.svg'
import ServiceAzdevops from './service-azdevops.svg'
import ServiceAzure from './service-azure.svg'
import ServiceBamboo from './service-bamboo.svg'
import ServiceBugsnag from './service-bugsnag.svg'
import ServiceCircleci from './service-circleci.svg'
import ServiceCloudformation from './service-cloudformation.svg'
import ServiceCloudwatch from './service-cloudwatch.svg'
import ServiceDatadog from './service-datadog.svg'
import ServiceDockerhub from './service-dockerhub.svg'
import ServiceDynatrace from './service-dynatrace.svg'
import ServiceEcs from './service-ecs.svg'
import ServiceElastigroup from './service-elastigroup.svg'
import ServiceElk from './service-elk.svg'
import ServiceGcpWithText from './service-gcp-with-text.svg'
import ServiceGcp from './service-gcp.svg'
import ServiceGithub from './service-github.svg'
import ServiceGotlab from './service-gotlab.svg'
import ServiceHelm from './service-helm.svg'
import ServiceInstana from './service-instana.svg'
import ServiceJenkins from './service-jenkins.svg'
import ServiceJira from './service-jira.svg'
import ServiceKubernetes from './service-kubernetes.svg'
import ServiceMicrosoftTeams from './service-microsoft-teams.svg'
import ServiceMongodb from './service-mongodb.svg'
import ServiceMydatacenter from './service-mydatacenter.svg'
import ServiceNewrelic from './service-newrelic.svg'
import ServiceNexus from './service-nexus.svg'
import ServiceOgz from './service-ogz.svg'
import ServicePagerduty from './service-pagerduty.svg'
import ServicePivotal from './service-pivotal.svg'
import ServicePrometheus from './service-prometheus.svg'
import ServiceRedis from './service-redis.svg'
import ServiceServiceS from './service-service-s3.svg'
import ServiceServicenow from './service-servicenow.svg'
import ServiceSlack from './service-slack.svg'
import ServiceSplunkWithName from './service-splunk-with-name.svg'
import ServiceSplunk from './service-splunk.svg'
import ServiceSpotinst from './service-spotinst.svg'
import ServiceStackdriver from './service-stackdriver.svg'
import ServiceSumologic from './service-sumologic.svg'
import ServiceTerraform from './service-terraform.svg'
import Service from './service.svg'
import SetupApi from './setup-api.svg'
import SetupTags from './setup-tags.svg'
import Spinner from './spinner.svg'
import StepGroup from './step-group.svg'
import StepsSpinner from './steps-spinner.svg'
import SupportAccount from './support-account.svg'
import SupportApi from './support-api.svg'
import SupportCode from './support-code.svg'
import SupportDashboard from './support-dashboard.svg'
import SupportDeployment from './support-deployment.svg'
import SupportGitops from './support-gitops.svg'
import SupportOnprem from './support-onprem.svg'
import SupportPipeline from './support-pipeline.svg'
import SupportSecurity from './support-security.svg'
import SupportStart from './support-start.svg'
import SupportTour from './support-tour.svg'
import SupportTroubleshoot from './support-troubleshoot.svg'
import SupportVerification from './support-verification.svg'
import SupportVideos from './support-videos.svg'
import TemplateLibrary from './template-library.svg'
import TestVerification from './test-verification.svg'
import TriggerArtifact from './trigger-artifact.svg'
import TriggerGithub from './trigger-github.svg'
import TriggerPipeline from './trigger-pipeline.svg'
import TriggerSchedule from './trigger-schedule.svg'
import Up from './up.svg'
import WhiteCluster from './white-cluster.svg'
import WhiteFullCluster from './white-full-cluster.svg'
import YamlBuilderEnv from './yaml-builder-env.svg'
import YamlBuilderInputSets from './yaml-builder-input-sets.svg'
import YamlBuilderNotifications from './yaml-builder-notifications.svg'
import YamlBuilderStages from './yaml-builder-stages.svg'
import YamlBuilderSteps from './yaml-builder-steps.svg'
import YamlBuilderTrigger from './yaml-builder-trigger.svg'
import ZoomIn from './zoom-in.svg'
import ZoomOut from './zoom-out.svg'

type HarnessIconName =
  | 'Edit'
  | 'Options'
  | 'activity'
  | 'app-aws-code-deploy'
  | 'app-aws-lambda'
  | 'app-kubernetes'
  | 'approval-step'
  | 'azure-kubernetes-service'
  | 'bitbucket'
  | 'blue-black-cluster'
  | 'bluegreen'
  | 'budget-alert-light'
  | 'canary-outline'
  | 'canary'
  | 'canvas-position'
  | 'canvas-reset'
  | 'canvas-selector'
  | 'cd-hover'
  | 'cd-main'
  | 'ce-application'
  | 'ce-beta'
  | 'ce-budget_colored'
  | 'ce-budget_grey'
  | 'ce-cloud'
  | 'ce-cluster'
  | 'ce-hover'
  | 'ce-main-colored'
  | 'ce-main-grey'
  | 'ce-main'
  | 'cf-hover'
  | 'cf-main'
  | 'check-alt'
  | 'check'
  | 'ci-hover'
  | 'ci-main'
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
  | 'conditional-skip-filled'
  | 'conditional-skip'
  | 'copy'
  | 'cs-hover'
  | 'custom-service'
  | 'cv-hover'
  | 'cv-main'
  | 'dashboard-selected'
  | 'dashboard'
  | 'dependency-step'
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
  | 'docker-hub-step'
  | 'down'
  | 'ecr-step'
  | 'elastic-kubernetes-service'
  | 'email-step'
  | 'execution-abort'
  | 'execution-input'
  | 'execution-rollback'
  | 'execution-success'
  | 'execution-warning'
  | 'expression-input'
  | 'feedback-given'
  | 'fixed-input'
  | 'functions'
  | 'gcr-step'
  | 'gcs-step'
  | 'gear'
  | 'git-clone-step'
  | 'github'
  | 'google-kubernetes-engine'
  | 'grey-cluster'
  | 'harness-logo-black'
  | 'harness-logo-white'
  | 'harness'
  | 'health'
  | 'hourglass'
  | 'http-step'
  | 'info'
  | 'initialize-step'
  | 'integration'
  | 'key-main'
  | 'key'
  | 'layout-bottom'
  | 'layout-float'
  | 'layout-right'
  | 'list-entity-infographic'
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
  | 'main-edit'
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
  | 'main-start'
  | 'main-tags'
  | 'main-template-library'
  | 'main-thumbsdown'
  | 'main-thumbsup'
  | 'main-trash'
  | 'main-unlock'
  | 'main-upload'
  | 'main-user-groups'
  | 'main-user'
  | 'main-view'
  | 'main-warning'
  | 'main-workflows'
  | 'main-zoom-out'
  | 'multi-service'
  | 'nav-account-admin-hover'
  | 'nav-account-admin-selected'
  | 'nav-account-admin'
  | 'nav-cd-hover'
  | 'nav-cd-selected'
  | 'nav-cd'
  | 'nav-cv-hover'
  | 'nav-cv-selected'
  | 'nav-cv'
  | 'nav-dashboard-hover'
  | 'nav-dashboard-selected'
  | 'nav-dashboard'
  | 'nav-deployments-hover'
  | 'nav-deployments-selected'
  | 'nav-deployments'
  | 'nav-git-sync'
  | 'nav-governance-hover'
  | 'nav-governance-selected'
  | 'nav-governance'
  | 'nav-harness-hover'
  | 'nav-harness-selected'
  | 'nav-harness'
  | 'nav-infrastructure-hover'
  | 'nav-infrastructure-selected'
  | 'nav-organization-hover'
  | 'nav-organization-selected'
  | 'nav-pipelines-hover'
  | 'nav-pipelines-selected'
  | 'nav-pipelines'
  | 'nav-project-hover'
  | 'nav-project-selected'
  | 'nav-project'
  | 'nav-resources-hover'
  | 'nav-resources-selected'
  | 'nav-resources'
  | 'nav-settings-hover'
  | 'nav-settings-selected'
  | 'nav-settings'
  | 'nav-user-profile-hover'
  | 'nav-user-profile-selected'
  | 'nav-user-profile'
  | 'new-decoration'
  | 'ng-filter'
  | 'no-feedback-given'
  | 'notification'
  | 'other-workload'
  | 'pending'
  | 'pipeline-approval'
  | 'pipeline-build-select'
  | 'pipeline-build'
  | 'pipeline-custom'
  | 'pipeline-deploy'
  | 'pipeline-ng'
  | 'pipeline-stage-selection-caret'
  | 'pipeline-variables'
  | 'pipeline'
  | 'placeholder-hover'
  | 'placeholder-selected'
  | 'placeholder'
  | 'plugin-step'
  | 'polygon'
  | 'profile'
  | 'publish-step'
  | 'question'
  | 'remove'
  | 'report-icon'
  | 'resources-icon'
  | 'restore-cache-step'
  | 'rolling'
  | 'run-pipeline'
  | 'run-step'
  | 'runtime-input'
  | 'save-cache-step'
  | 'search-applications'
  | 'search-connectors'
  | 'search-environments'
  | 'search-infra-prov'
  | 'search-pipelines'
  | 'search-services'
  | 'search-tips'
  | 'search-triggers'
  | 'search-user-groups'
  | 'search-users'
  | 'search-workflow'
  | 'secret-manager'
  | 'secret-ssh'
  | 'service-appdynamics'
  | 'service-artifactory'
  | 'service-aws-code-deploy'
  | 'service-aws-lamda'
  | 'service-aws'
  | 'service-azdevops'
  | 'service-azure'
  | 'service-bamboo'
  | 'service-bugsnag'
  | 'service-circleci'
  | 'service-cloudformation'
  | 'service-cloudwatch'
  | 'service-datadog'
  | 'service-dockerhub'
  | 'service-dynatrace'
  | 'service-ecs'
  | 'service-elastigroup'
  | 'service-elk'
  | 'service-gcp-with-text'
  | 'service-gcp'
  | 'service-github'
  | 'service-gotlab'
  | 'service-helm'
  | 'service-instana'
  | 'service-jenkins'
  | 'service-jira'
  | 'service-kubernetes'
  | 'service-microsoft-teams'
  | 'service-mongodb'
  | 'service-mydatacenter'
  | 'service-newrelic'
  | 'service-nexus'
  | 'service-ogz'
  | 'service-pagerduty'
  | 'service-pivotal'
  | 'service-prometheus'
  | 'service-redis'
  | 'service-service-s3'
  | 'service-servicenow'
  | 'service-slack'
  | 'service-splunk-with-name'
  | 'service-splunk'
  | 'service-spotinst'
  | 'service-stackdriver'
  | 'service-sumologic'
  | 'service-terraform'
  | 'service'
  | 'setup-api'
  | 'setup-tags'
  | 'spinner'
  | 'step-group'
  | 'steps-spinner'
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
  | 'template-library'
  | 'test-verification'
  | 'trigger-artifact'
  | 'trigger-github'
  | 'trigger-pipeline'
  | 'trigger-schedule'
  | 'up'
  | 'white-cluster'
  | 'white-full-cluster'
  | 'yaml-builder-env'
  | 'yaml-builder-input-sets'
  | 'yaml-builder-notifications'
  | 'yaml-builder-stages'
  | 'yaml-builder-steps'
  | 'yaml-builder-trigger'
  | 'zoom-in'
  | 'zoom-out'

const HarnessIcons: KVO<FunctionComponent<ElementType>> = {
  Edit: Edit,
  Options: Options,
  activity: Activity,
  'app-aws-code-deploy': AppAwsCodeDeploy,
  'app-aws-lambda': AppAwsLambda,
  'app-kubernetes': AppKubernetes,
  'approval-step': ApprovalStep,
  'azure-kubernetes-service': AzureKubernetesService,
  bitbucket: Bitbucket,
  'blue-black-cluster': BlueBlackCluster,
  bluegreen: Bluegreen,
  'budget-alert-light': BudgetAlertLight,
  'canary-outline': CanaryOutline,
  canary: Canary,
  'canvas-position': CanvasPosition,
  'canvas-reset': CanvasReset,
  'canvas-selector': CanvasSelector,
  'cd-hover': CdHover,
  'cd-main': CdMain,
  'ce-application': CeApplication,
  'ce-beta': CeBeta,
  'ce-budget_colored': CeBudgetColored,
  'ce-budget_grey': CeBudgetGrey,
  'ce-cloud': CeCloud,
  'ce-cluster': CeCluster,
  'ce-hover': CeHover,
  'ce-main-colored': CeMainColored,
  'ce-main-grey': CeMainGrey,
  'ce-main': CeMain,
  'cf-hover': CfHover,
  'cf-main': CfMain,
  'check-alt': CheckAlt,
  check: Check,
  'ci-hover': CiHover,
  'ci-main': CiMain,
  'command-approval': CommandApproval,
  'command-artifact-check': CommandArtifactCheck,
  'command-barrier': CommandBarrier,
  'command-calendar': CommandCalendar,
  'command-echo': CommandEcho,
  'command-email': CommandEmail,
  'command-http': CommandHttp,
  'command-icon': CommandIcon,
  'command-install': CommandInstall,
  'command-resource-constraint': CommandResourceConstraint,
  'command-rollback': CommandRollback,
  'command-shell-script': CommandShellScript,
  'command-start': CommandStart,
  'command-stop': CommandStop,
  'command-swap': CommandSwap,
  'command-switch': CommandSwitch,
  'command-winrm': CommandWinrm,
  'conditional-skip-filled': ConditionalSkipFilled,
  'conditional-skip': ConditionalSkip,
  copy: Copy,
  'cs-hover': CsHover,
  'custom-service': CustomService,
  'cv-hover': CvHover,
  'cv-main': CvMain,
  'dashboard-selected': DashboardSelected,
  dashboard: Dashboard,
  'dependency-step': DependencyStep,
  'deployment-aborted-legacy': DeploymentAbortedLegacy,
  'deployment-aborted-new': DeploymentAbortedNew,
  'deployment-failed-legacy': DeploymentFailedLegacy,
  'deployment-failed-new': DeploymentFailedNew,
  'deployment-incomplete-legacy': DeploymentIncompleteLegacy,
  'deployment-incomplete-new': DeploymentIncompleteNew,
  'deployment-inprogress-legacy': DeploymentInprogressLegacy,
  'deployment-inprogress-new': DeploymentInprogressNew,
  'deployment-paused-legacy': DeploymentPausedLegacy,
  'deployment-paused-new': DeploymentPausedNew,
  'deployment-queued-legacy': DeploymentQueuedLegacy,
  'deployment-queued-new': DeploymentQueuedNew,
  'deployment-rejected-legacy': DeploymentRejectedLegacy,
  'deployment-rejected-new': DeploymentRejectedNew,
  'deployment-success-legacy': DeploymentSuccessLegacy,
  'deployment-success-new': DeploymentSuccessNew,
  'deployment-timeout-legacy': DeploymentTimeoutLegacy,
  'deployment-timeout-new': DeploymentTimeoutNew,
  'docker-hub-step': DockerHubStep,
  down: Down,
  'ecr-step': EcrStep,
  'elastic-kubernetes-service': ElasticKubernetesService,
  'email-step': EmailStep,
  'execution-abort': ExecutionAbort,
  'execution-input': ExecutionInput,
  'execution-rollback': ExecutionRollback,
  'execution-success': ExecutionSuccess,
  'execution-warning': ExecutionWarning,
  'expression-input': ExpressionInput,
  'feedback-given': FeedbackGiven,
  'fixed-input': FixedInput,
  functions: Functions,
  'gcr-step': GcrStep,
  'gcs-step': GcsStep,
  gear: Gear,
  'git-clone-step': GitCloneStep,
  github: Github,
  'google-kubernetes-engine': GoogleKubernetesEngine,
  'grey-cluster': GreyCluster,
  'harness-logo-black': HarnessLogoBlack,
  'harness-logo-white': HarnessLogoWhite,
  harness: Harness,
  health: Health,
  hourglass: Hourglass,
  'http-step': HttpStep,
  info: Info,
  'initialize-step': InitializeStep,
  integration: Integration,
  'key-main': KeyMain,
  key: Key,
  'layout-bottom': LayoutBottom,
  'layout-float': LayoutFloat,
  'layout-right': LayoutRight,
  'list-entity-infographic': ListEntityInfographic,
  'main-abort': MainAbort,
  'main-account-notifications': MainAccountNotifications,
  'main-add': MainAdd,
  'main-applications': MainApplications,
  'main-apply': MainApply,
  'main-baseline': MainBaseline,
  'main-calendar': MainCalendar,
  'main-canary': MainCanary,
  'main-caret-down': MainCaretDown,
  'main-caret-left': MainCaretLeft,
  'main-caret-right': MainCaretRight,
  'main-caret-up': MainCaretUp,
  'main-changelog': MainChangelog,
  'main-chevron-down': MainChevronDown,
  'main-chevron-left': MainChevronLeft,
  'main-chevron-right': MainChevronRight,
  'main-chevron-up': MainChevronUp,
  'main-clone': MainClone,
  'main-close': MainClose,
  'main-cloud-providers': MainCloudProviders,
  'main-cloud': MainCloud,
  'main-code-yaml': MainCodeYaml,
  'main-dashboard': MainDashboard,
  'main-delegates': MainDelegates,
  'main-delete': MainDelete,
  'main-depricate': MainDepricate,
  'main-destroy': MainDestroy,
  'main-download': MainDownload,
  'main-edit': MainEdit,
  'main-email': MainEmail,
  'main-environments': MainEnvironments,
  'main-feedback': MainFeedback,
  'main-filter': MainFilter,
  'main-flag': MainFlag,
  'main-folder-new': MainFolderNew,
  'main-folder-open': MainFolderOpen,
  'main-folder': MainFolder,
  'main-fullscreen': MainFullscreen,
  'main-help': MainHelp,
  'main-info': MainInfo,
  'main-infrastructure-provisioners': MainInfrastructureProvisioners,
  'main-issue-filled': MainIssueFilled,
  'main-issue': MainIssue,
  'main-like': MainLike,
  'main-link': MainLink,
  'main-list': MainList,
  'main-listener-update': MainListenerUpdate,
  'main-lock': MainLock,
  'main-main-zoom_in': MainMainZoomIn,
  'main-maximize': MainMaximize,
  'main-minimize': MainMinimize,
  'main-more': MainMore,
  'main-move': MainMove,
  'main-notes': MainNotes,
  'main-notifications': MainNotifications,
  'main-pause': MainPause,
  'main-pipelines': MainPipelines,
  'main-popularity': MainPopularity,
  'main-refresh': MainRefresh,
  'main-reorder': MainReorder,
  'main-rerun': MainRerun,
  'main-resume': MainResume,
  'main-rollback': MainRollback,
  'main-saved': MainSaved,
  'main-scope': MainScope,
  'main-search': MainSearch,
  'main-service-ami': MainServiceAmi,
  'main-services': MainServices,
  'main-setup': MainSetup,
  'main-share': MainShare,
  'main-start': MainStart,
  'main-tags': MainTags,
  'main-template-library': MainTemplateLibrary,
  'main-thumbsdown': MainThumbsdown,
  'main-thumbsup': MainThumbsup,
  'main-trash': MainTrash,
  'main-unlock': MainUnlock,
  'main-upload': MainUpload,
  'main-user-groups': MainUserGroups,
  'main-user': MainUser,
  'main-view': MainView,
  'main-warning': MainWarning,
  'main-workflows': MainWorkflows,
  'main-zoom-out': MainZoomOut,
  'multi-service': MultiService,
  'nav-account-admin-hover': NavAccountAdminHover,
  'nav-account-admin-selected': NavAccountAdminSelected,
  'nav-account-admin': NavAccountAdmin,
  'nav-cd-hover': NavCdHover,
  'nav-cd-selected': NavCdSelected,
  'nav-cd': NavCd,
  'nav-cv-hover': NavCvHover,
  'nav-cv-selected': NavCvSelected,
  'nav-cv': NavCv,
  'nav-dashboard-hover': NavDashboardHover,
  'nav-dashboard-selected': NavDashboardSelected,
  'nav-dashboard': NavDashboard,
  'nav-deployments-hover': NavDeploymentsHover,
  'nav-deployments-selected': NavDeploymentsSelected,
  'nav-deployments': NavDeployments,
  'nav-git-sync': NavGitSync,
  'nav-governance-hover': NavGovernanceHover,
  'nav-governance-selected': NavGovernanceSelected,
  'nav-governance': NavGovernance,
  'nav-harness-hover': NavHarnessHover,
  'nav-harness-selected': NavHarnessSelected,
  'nav-harness': NavHarness,
  'nav-infrastructure-hover': NavInfrastructureHover,
  'nav-infrastructure-selected': NavInfrastructureSelected,
  'nav-organization-hover': NavOrganizationHover,
  'nav-organization-selected': NavOrganizationSelected,
  'nav-pipelines-hover': NavPipelinesHover,
  'nav-pipelines-selected': NavPipelinesSelected,
  'nav-pipelines': NavPipelines,
  'nav-project-hover': NavProjectHover,
  'nav-project-selected': NavProjectSelected,
  'nav-project': NavProject,
  'nav-resources-hover': NavResourcesHover,
  'nav-resources-selected': NavResourcesSelected,
  'nav-resources': NavResources,
  'nav-settings-hover': NavSettingsHover,
  'nav-settings-selected': NavSettingsSelected,
  'nav-settings': NavSettings,
  'nav-user-profile-hover': NavUserProfileHover,
  'nav-user-profile-selected': NavUserProfileSelected,
  'nav-user-profile': NavUserProfile,
  'new-decoration': NewDecoration,
  'ng-filter': NgFilter,
  'no-feedback-given': NoFeedbackGiven,
  notification: Notification,
  'other-workload': OtherWorkload,
  pending: Pending,
  'pipeline-approval': PipelineApproval,
  'pipeline-build-select': PipelineBuildSelect,
  'pipeline-build': PipelineBuild,
  'pipeline-custom': PipelineCustom,
  'pipeline-deploy': PipelineDeploy,
  'pipeline-ng': PipelineNg,
  'pipeline-stage-selection-caret': PipelineStageSelectionCaret,
  'pipeline-variables': PipelineVariables,
  pipeline: Pipeline,
  'placeholder-hover': PlaceholderHover,
  'placeholder-selected': PlaceholderSelected,
  placeholder: Placeholder,
  'plugin-step': PluginStep,
  polygon: Polygon,
  profile: Profile,
  'publish-step': PublishStep,
  question: Question,
  remove: Remove,
  'report-icon': ReportIcon,
  'resources-icon': ResourcesIcon,
  'restore-cache-step': RestoreCacheStep,
  rolling: Rolling,
  'run-pipeline': RunPipeline,
  'run-step': RunStep,
  'runtime-input': RuntimeInput,
  'save-cache-step': SaveCacheStep,
  'search-applications': SearchApplications,
  'search-connectors': SearchConnectors,
  'search-environments': SearchEnvironments,
  'search-infra-prov': SearchInfraProv,
  'search-pipelines': SearchPipelines,
  'search-services': SearchServices,
  'search-tips': SearchTips,
  'search-triggers': SearchTriggers,
  'search-user-groups': SearchUserGroups,
  'search-users': SearchUsers,
  'search-workflow': SearchWorkflow,
  'secret-manager': SecretManager,
  'secret-ssh': SecretSsh,
  'service-appdynamics': ServiceAppdynamics,
  'service-artifactory': ServiceArtifactory,
  'service-aws-code-deploy': ServiceAwsCodeDeploy,
  'service-aws-lamda': ServiceAwsLamda,
  'service-aws': ServiceAws,
  'service-azdevops': ServiceAzdevops,
  'service-azure': ServiceAzure,
  'service-bamboo': ServiceBamboo,
  'service-bugsnag': ServiceBugsnag,
  'service-circleci': ServiceCircleci,
  'service-cloudformation': ServiceCloudformation,
  'service-cloudwatch': ServiceCloudwatch,
  'service-datadog': ServiceDatadog,
  'service-dockerhub': ServiceDockerhub,
  'service-dynatrace': ServiceDynatrace,
  'service-ecs': ServiceEcs,
  'service-elastigroup': ServiceElastigroup,
  'service-elk': ServiceElk,
  'service-gcp-with-text': ServiceGcpWithText,
  'service-gcp': ServiceGcp,
  'service-github': ServiceGithub,
  'service-gotlab': ServiceGotlab,
  'service-helm': ServiceHelm,
  'service-instana': ServiceInstana,
  'service-jenkins': ServiceJenkins,
  'service-jira': ServiceJira,
  'service-kubernetes': ServiceKubernetes,
  'service-microsoft-teams': ServiceMicrosoftTeams,
  'service-mongodb': ServiceMongodb,
  'service-mydatacenter': ServiceMydatacenter,
  'service-newrelic': ServiceNewrelic,
  'service-nexus': ServiceNexus,
  'service-ogz': ServiceOgz,
  'service-pagerduty': ServicePagerduty,
  'service-pivotal': ServicePivotal,
  'service-prometheus': ServicePrometheus,
  'service-redis': ServiceRedis,
  'service-service-s3': ServiceServiceS,
  'service-servicenow': ServiceServicenow,
  'service-slack': ServiceSlack,
  'service-splunk-with-name': ServiceSplunkWithName,
  'service-splunk': ServiceSplunk,
  'service-spotinst': ServiceSpotinst,
  'service-stackdriver': ServiceStackdriver,
  'service-sumologic': ServiceSumologic,
  'service-terraform': ServiceTerraform,
  service: Service,
  'setup-api': SetupApi,
  'setup-tags': SetupTags,
  spinner: Spinner,
  'step-group': StepGroup,
  'steps-spinner': StepsSpinner,
  'support-account': SupportAccount,
  'support-api': SupportApi,
  'support-code': SupportCode,
  'support-dashboard': SupportDashboard,
  'support-deployment': SupportDeployment,
  'support-gitops': SupportGitops,
  'support-onprem': SupportOnprem,
  'support-pipeline': SupportPipeline,
  'support-security': SupportSecurity,
  'support-start': SupportStart,
  'support-tour': SupportTour,
  'support-troubleshoot': SupportTroubleshoot,
  'support-verification': SupportVerification,
  'support-videos': SupportVideos,
  'template-library': TemplateLibrary,
  'test-verification': TestVerification,
  'trigger-artifact': TriggerArtifact,
  'trigger-github': TriggerGithub,
  'trigger-pipeline': TriggerPipeline,
  'trigger-schedule': TriggerSchedule,
  up: Up,
  'white-cluster': WhiteCluster,
  'white-full-cluster': WhiteFullCluster,
  'yaml-builder-env': YamlBuilderEnv,
  'yaml-builder-input-sets': YamlBuilderInputSets,
  'yaml-builder-notifications': YamlBuilderNotifications,
  'yaml-builder-stages': YamlBuilderStages,
  'yaml-builder-steps': YamlBuilderSteps,
  'yaml-builder-trigger': YamlBuilderTrigger,
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut
}

export { HarnessIcons, HarnessIconName }
