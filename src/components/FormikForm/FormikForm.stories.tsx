/* eslint-disable no-useless-escape */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { noop } from 'lodash-es'
import * as Yup from 'yup'

import { Formik, FormikForm, FormInput } from '../FormikForm/FormikForm'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { FormikFormProps } from 'formik'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { TooltipContextProvider } from '../../frameworks/Tooltip/TooltipContext'

const tooltips: Record<string, string> = {
  option1: 'This is example tooltip 1',
  option2: 'This is example tooltip 2'
}

export default {
  title: 'Form / FormikForm',
  component: FormikForm,
  decorators: [
    Story => (
      <TooltipContextProvider initialTooltipDictionary={tooltips}>
        <Story />
      </TooltipContextProvider>
    )
  ]
} as Meta

const getSampleTooltip = () => {
  return {
    content: `Click **Click to autocreate a monitored service**.
  Harness automatically creates a Monitored Service using a concatenation of the Service and Environment names. 
  For example, a Service named \`todolist\` and an Environment named \`dev\` will result in a Monitored Service named \`todolist\_dev\`.
  If the stage Service or Environment settings are [Runtime Inputs](https://ngdocs.harness.io/article/f6yobn7iq0), the Monitored Service and Health Sources settings will show up in the Runtime Input settings when you run the Pipeline.
  [Learn More](https://ngdocs.harness.io/article/3xhqq9xllp)
  # Headings
  
  \`\`\`
  # Heading 1 *
  ## Heading 2
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  \`\`\`
  
  # Heading 1 *
  ## Heading 2
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  
  \`\`\`
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  \`\`\`
  
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  
  Heading 1
  =
  Heading 2
  -
  
  # Text styles
  
  \`\`\`
  Bold
  **The quick brown fox jumps over the lazy dog.**
  __The quick brown fox jumps over the lazy dog.__
  <strong>The quick brown fox jumps over the lazy dog.</strong>
  Italic
  *The quick brown fox jumps over the lazy dog.*
  _The quick brown fox jumps over the lazy dog._
  <em>The quick brown fox jumps over the lazy dog.</em>
  Bold and Italic
  **_The quick brown fox jumps over the lazy dog._**
  <strong><em>The quick brown fox jumps over the lazy dog.</em></strong>
  \`\`\`
  
  The quick brown fox jumps over the lazy dog.
  
  Bold
  
  **The quick brown fox jumps over the lazy dog.**
  
  __The quick brown fox jumps over the lazy dog.__
  
  <strong>The quick brown fox jumps over the lazy dog.</strong>
  
  
  Italic
  
  *The quick brown fox jumps over the lazy dog.*
  
  _The quick brown fox jumps over the lazy dog._
  
  <em>The quick brown fox jumps over the lazy dog.</em>
  
  Bold and Italic
  
  **_The quick brown fox jumps over the lazy dog._**
  
  <strong><em>The quick brown fox jumps over the lazy dog.</em></strong>
  
  Blockquotes
  
  \`\`\`
  > The quick brown fox jumps over the lazy dog.
  > The quick brown fox jumps over the lazy dog.
  > 
  > The quick brown fox jumps over the lazy dog.
  > 
  > The quick brown fox jumps over the lazy dog.
  > The quick brown fox jumps over the lazy dog.
  >> The quick brown fox jumps over the lazy dog.
  >>> The quick brown fox jumps over the lazy dog.
  > **The quick brown fox** *jumps over the lazy dog.*
  \`\`\`
  
  > The quick brown fox jumps over the lazy dog.
  
  > The quick brown fox jumps over the lazy dog.
  > 
  > The quick brown fox jumps over the lazy dog.
  > 
  > The quick brown fox jumps over the lazy dog.
  
  > The quick brown fox jumps over the lazy dog.
  >> The quick brown fox jumps over the lazy dog.
  >>> The quick brown fox jumps over the lazy dog.
  
  > **The quick brown fox** *jumps over the lazy dog.*
  
  \`\`\`
  Monospaced
  <samp>The quick brown fox jumps over the lazy dog.</samp>
  
  Underlined
  <ins>The quick brown fox jumps over the lazy dog.</ins>
  
  Strike-through
  ~~The quick brown fox jumps over the lazy dog.~~
  \`\`\`
  
  Monospaced
  
  <samp>The quick brown fox jumps over the lazy dog.</samp>
  
  Underlined
  
  <ins>The quick brown fox jumps over the lazy dog.</ins>
  
  Strike-through
  
  ~~The quick brown fox jumps over the lazy dog.~~
  
  \`\`\`
  Boxed
  <table><tr><td>The quick brown fox jumps over the lazy dog.</td></tr></table>
  \`\`\`
  
  Boxed
  
  <table><tr><td>The quick brown fox jumps over the lazy dog.</td></tr></table>
  
  \`\`\`
  Subscript <sub>The quick brown fox jumps over the lazy dog.</sub>
  Superscript <sup>The quick brown fox jumps over the lazy dog.</sup>
  \`\`\`
  
  Subscript <sub>The quick brown fox jumps over the lazy dog.</sub>
  
  Superscript <sup>The quick brown fox jumps over the lazy dog.</sup>
  
  
  
  # Syntax Highlighting
  
  A class method is an instance method of the class object. When a new class is created, an object of type \`Class\` is initialized and assigned to a global constant (Mobile in this case).
  
  
  \`\`\`
  public static String monthNames[] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
  \`\`\`
  
  
  \`\`\`java
  public static String monthNames[] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
  \`\`\`
  
  # Alignments
  \`\`\`
  <p align="left">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  \`\`\`
  
  <p align="left">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  
  \`\`\`
  <p align="center">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  \`\`\`
  
  <p align="center">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  
  \`\`\`
  <p align="right">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  \`\`\`
  
  <p align="right">
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  </p>
  
  \`\`\`
  <h3 align="center"> My latest Medium posts </h3>
  \`\`\`
  
  <h3 align="center"> My latest Medium posts </h3>
  
  
  # Tables
  
  \`\`\`
  <table>
  <tr>
  <td width="33%"">
  The quick brown fox jumps over the lazy dog.
  </td>
  <td width="33%">
  The quick brown fox jumps over the lazy dog.
  </td>
  <td width="33%">
  The quick brown fox jumps over the lazy dog.
  </td>
  </tr>
  </table>
  \`\`\`
  
  <table>
  <tr>
  <td width="33%"">
  The quick brown fox jumps over the lazy dog.
  </td>
  <td width="33%">
  The quick brown fox jumps over the lazy dog.
  </td>
  <td width="33%">
  The quick brown fox jumps over the lazy dog.
  </td>
  </tr>
  </table>
  
  
  
  \`\`\`
  | Default | Left align | Center align | Right align |
  | - | :- | :-: | -: |
  | 9999999999 | 9999999999 | 9999999999 | 9999999999 |
  | 999999999 | 999999999 | 999999999 | 999999999 |
  | 99999999 | 99999999 | 99999999 | 99999999 |
  | 9999999 | 9999999 | 9999999 | 9999999 |
  
  
  | Default    | Left align | Center align | Right align |
  | ---------- | :--------- | :----------: | ----------: |
  | 9999999999 | 9999999999 | 9999999999   | 9999999999  |
  | 999999999  | 999999999  | 999999999    | 999999999   |
  | 99999999   | 99999999   | 99999999     | 99999999    |
  | 9999999    | 9999999    | 9999999      | 9999999     |
  
  
  Default    | Left align | Center align | Right align
  ---------- | :--------- | :----------: | ----------:
  9999999999 | 9999999999 | 9999999999   | 9999999999 
  999999999  | 999999999  | 999999999    | 999999999  
  99999999   | 99999999   | 99999999     | 99999999   
  9999999    | 9999999    | 9999999      | 9999999 
  \`\`\`
  
  | Default | Left align | Center align | Right align |
  | - | :- | :-: | -: |
  | 9999999999 | 9999999999 | 9999999999 | 9999999999 |
  | 999999999 | 999999999 | 999999999 | 999999999 |
  | 99999999 | 99999999 | 99999999 | 99999999 |
  | 9999999 | 9999999 | 9999999 | 9999999 |
  
  
  | Default    | Left align | Center align | Right align |
  | ---------- | :--------- | :----------: | ----------: |
  | 9999999999 | 9999999999 | 9999999999   | 9999999999  |
  | 999999999  | 999999999  | 999999999    | 999999999   |
  | 99999999   | 99999999   | 99999999     | 99999999    |
  | 9999999    | 9999999    | 9999999      | 9999999     |
  
  
  Default    | Left align | Center align | Right align
  ---------- | :--------- | :----------: | ----------:
  9999999999 | 9999999999 | 9999999999   | 9999999999 
  999999999  | 999999999  | 999999999    | 999999999  
  99999999   | 99999999   | 99999999     | 99999999   
  9999999    | 9999999    | 9999999      | 9999999 
  
  
  \`\`\`
  <table>
  <tr>
  <th>Heading 1</th>
  <th>Heading 2</th>
  </tr>
  <tr>
  
  <td>
  
  | A | B | C |
  |--|--|--|
  | 1 | 2 | 3 |
  
  </td><td>
  
  | A | B | C |
  |--|--|--|
  | 1 | 2 | 3 |
  
  </td></tr> </table>
  \`\`\`
  
  <table>
  <tr>
  <th>Heading 1</th>
  <th>Heading 2</th>
  </tr>
  <tr>
  
  <td>
  
  | A | B | C |
  |--|--|--|
  | 1 | 2 | 3 |
  
  </td><td>
  
  | A | B | C |
  |--|--|--|
  | 1 | 2 | 3 |
  
  </td></tr> </table>
  
  \`\`\`
  | A | B | C |
  |---|---|---|
  | 1 | 2 | 3 <br/> 4 <br/> 5 |
  \`\`\`
  
  | A | B | C |
  |---|---|---|
  | 1 | 2 | 3 <br/> 4 <br/> 5 |
  
  # Links
  
  \`\`\`
  [The-Ultimate-Markdown-Cheat-Sheet](https://github.com/lifeparticle/Markdown-Cheatsheet)
  \`\`\`
  
  [The-Ultimate-Markdown-Cheat-Sheet](https://github.com/lifeparticle/The-Ultimate-Markdown-Cheat-Sheet)
  
  \`\`\`
  [The-Ultimate-Markdown-Cheat-Sheet][reference text]
  
  [The-Ultimate-Markdown-Cheat-Sheet][1]
  
  [Markdown-Cheat-Sheet]
  
  [reference text]: https://github.com/lifeparticle/Markdown-Cheatsheet
  [1]: https://github.com/lifeparticle/Markdown-Cheatsheet
  [Markdown-Cheat-Sheet]: https://github.com/lifeparticle/Markdown-Cheatsheet
  \`\`\`
  
  [The-Ultimate-Markdown-Cheat-Sheet][reference text]
  
  [The-Ultimate-Markdown-Cheat-Sheet][1]
  
  [Markdown-Cheat-Sheet]
  
  [reference text]: https://github.com/lifeparticle/The-Ultimate-Markdown-Cheat-Sheet
  [1]: https://github.com/lifeparticle/The-Ultimate-Markdown-Cheat-Sheet
  [Markdown-Cheat-Sheet]: https://github.com/lifeparticle/The-Ultimate-Markdown-Cheat-Sheet
  
  
  \`\`\`
  [Example of a relative link](rl.md)
  \`\`\`
  
  [Example of a relative link](rl.md)
  
  
  Visit https://github.com/
  
  # Images
  
  \`\`\`
  ![alt text](https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80)
  \`\`\`
  
  ![alt text](https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80)
  
  \`\`\`
  ![alt text][image]
  
  [image]: https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80
  \`\`\`
  ![alt text][image]
  
  [image]: https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80
  
  \`\`\`
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  \`\`\`
  
  <img src="https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2772&q=80" width="100" height="100" border="10"/>
  
  
  <img src="https://media.giphy.com/media/qLHzYjlA2FW8g/giphy.gif" />
  
  <img src="https://img.shields.io/badge/theultimatemarkdowncheatsheet-brightgreen.svg" />
  
  # Lists
  
  \`\`\`
  1. One
  2. Two
  3. Three
  \`\`\`
  
  1. One
  2. Two
  3. Three
  
  \`\`\`
  1. First level
      1. Second level
          - Third level
              - Fourth level
  2. First level
      1. Second level
  3. First level
      1. Second level
  \`\`\`
  
  
  1. First level
      1. Second level
          - Third level
              - Fourth level
  2. First level
      1. Second level
  3. First level
      1. Second level
      
  
  
  \`\`\`
  * 1
  * 2
  * 3
  
  + 1
  + 2
  + 3
  
  
  - 1
  - 2
  - 3
  \`\`\`
  
  * 1
  * 2
  * 3
  
  + 1
  + 2
  + 3
  
  
  - 1
  - 2
  - 3
  
  
  \`\`\`
  - First level
      - Second level
          - Third level
              - Fourth level
  - First level
      - Second level
  - First level
      - Second level
  \`\`\`
  
  - First level
      - Second level
          - Third level
              - Fourth level
  - First level
      - Second level
  - First level
      - Second level
  
  \`\`\`
  <ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
  <li>Fourth item</li>
  </ul>
  \`\`\`
  
  <ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
  <li>Fourth item</li>
  </ul>
  
  \`\`\`
  - [x] Fix Bug 223
  - [ ] Add Feature 33
  - [ ] Add unit tests
  \`\`\`
  
  - [x] Fix Bug 223
  - [ ] Add Feature 33
  - [ ] Add unit tests
  
  
  # Horizontal Rule
  
  \`\`\`
  ---
  ***
  ___
  \`\`\`
  
  ---
  
  ***
  
  ___
  
  
  # Miscellaneous
  
  <!--
  Lorem ipsum dolor sit amet
  -->
  
  \`\`\`
  *   Asterisk
  \\   Backslash
  \`   Backtick
  {}  Curly braces
  .   Dot
  !   Exclamation mark
  #   Hash symbol
  -   Hyphen symbol
  ()  Parentheses
  +   Plus symbol
  []  Square brackets
  _   Underscore\`
  \`\`\`
  
  *   Asterisk
  \\   Backslash
  \`   Backtick
  {}  Curly braces
  .   Dot
  !   Exclamation mark
  #   Hash symbol
  -   Hyphen symbol
  ()  Parentheses
  +   Plus symbol
  []  Square brackets
  _   Underscore
  
  
  \`\`\`
  *   Asterisk
  \\   Backslash
  \\\`   Backtick
  \{}  Curly braces
  \.   Dot
  \!   Exclamation mark
  \#   Hash symbol
  \-   Hyphen symbol
  \()  Parentheses
  \+   Plus symbol
  \[]  Square brackets
  \_   Underscore
  \`\`\`
  
  *Asterisk
  \\   Backslash
  \\\`   Backtick
  \{}  Curly braces
  \.   Dot
  \!   Exclamation mark
  \#   Hash symbol
  \-   Hyphen symbol
  \()  Parentheses
  \+   Plus symbol
  \[]  Square brackets
  \_   Underscore
  
  \`\`\`
  :octocat:
  \`\`\`
  
  :octocat:
  
  
  \`\`\`
  @lifeparticle
  \`\`\`
  
  @lifeparticle
  
  \`\`\`
  #
  \`\`\`
  
  \#
  `,
    width: 1400
  }
}

export const Basic: Story<FormikFormProps> = () => (
  <Container width={400} margin={{ left: 'large' }}>
    <Formik
      formName="formikFormBasic"
      initialValues={{
        name: '',
        multiInput: '',
        colorMulti: '',
        description: '',
        specialPerson: true,
        exp: '<+app.name>',
        jobDesc2: '<+input>.allowedValues(10, 20, 30)'
      }}
      onSubmit={noop}
      validationSchema={Yup.object().shape({
        name: Yup.string().trim().required('First Name is required field'),
        color: Yup.string().trim().required('Color is required field'),
        specialPerson: Yup.boolean().required('VVIP is required field'),
        colorMulti: Yup.array().ensure().compact().min(1, 'Color Multi is required field'),
        picture: Yup.string().trim().required('Picture is required field'),
        exp: Yup.string().trim().required('Expression is required field'),
        description: Yup.string().trim().required('Description is required field'),
        sportsAndPokemon: Yup.string().required('Sports and Pokemon is required')
      })}>
      {() => {
        return (
          <FormikForm>
            <FormInput.Text
              name="name"
              label={
                <HarnessDocTooltip contentFromParent={getSampleTooltip()} labelText="Name" tooltipId="nameTextField" />
              }
              placeholder="First Name"
              tooltipProps={{
                dataTooltipId: 'nameTextField'
              }}
            />
            <FormInput.Text
              name="age"
              inputGroup={{ type: 'number' }}
              label="Age"
              isOptional
              placeholder="Age in years"
              tooltipProps={{
                dataTooltipId: 'ageNumberField'
              }}
            />
            <FormInput.KVTagInput
              name="tags"
              label="Tags"
              isArray={true}
              tooltipProps={{
                dataTooltipId: 'tagInputId'
              }}
            />
            <FormInput.ExpressionInput
              items={[
                'app.name',
                'app.description',
                'pipeline.name',
                'pipeline.description',
                'pipeline.identifier',
                'pipeline.stage.qa.displayName'
              ]}
              name="exp"
              label="Expressions"
              tooltipProps={{
                dataTooltipId: 'idforexpressioninput'
              }}
            />
            <FormInput.CheckBox
              name="specialPerson"
              label="VVIP"
              tooltipProps={{
                dataTooltipId: 'checkboxField'
              }}
            />
            <FormInput.Toggle name="toggle" label="Toggle" tooltipProps={{ dataTooltipId: 'toggleField' }} />
            <FormInput.FileInput
              name="picture"
              label="Upload Picture"
              buttonText="Select"
              tooltipProps={{
                dataTooltipId: 'uploadPictureField'
              }}
            />
            <FormInput.RadioGroup
              name="eventType"
              label="Event Type"
              items={[
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' }
              ]}
            />
            <FormInput.Select
              name="color"
              label="Color"
              placeholder="Select Color"
              items={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
            />
            <FormInput.MultiSelect
              name="colorMulti"
              label="Color Multi"
              placeholder="Select Multiple Colors"
              items={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
            />
            <FormInput.TextArea name="description" label="Description" />
            <FormInput.MultiTypeInput
              name="job"
              label="Job"
              selectItems={[
                { label: 'Software Engineer', value: 'SE' },
                { label: 'Quality Engineer', value: 'QE' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
              useValue
              multiTypeInputProps={{
                selectProps: {
                  addClearBtn: true,
                  items: [
                    { label: 'Software Engineer', value: 'SE' },
                    { label: 'Quality Engineer', value: 'QE' },
                    {
                      label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                      value: 'xyz'
                    },
                    { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
                  ]
                }
              }}
            />
            <FormInput.DropDown
              name="values"
              label="DropDown"
              items={[
                { label: 'BBall', value: 'bball' },
                { label: 'Soccer', value: 'soccer' },
                { label: 'Football', value: 'football' },
                { label: 'Pikachu', value: 'pikachu' },
                { label: 'Garchomp', value: 'garchomp' }
              ]}
              dropDownProps={{
                filterable: false,
                isLabel: true
              }}
            />
            <FormInput.MultiTextInput name="jobDesc1" label="Job Desc 1" />
            <FormInput.MultiTextInput name="jobDec2" placeholder="Job Desc" label="Job Desc 2" />
            <FormInput.MultiTextInput
              name="numbertype"
              multiTextInputProps={{ textProps: { type: 'number' } }}
              placeholder="Number type multi text"
              label="Number type multi text"
            />
            <FormInput.MultiSelectTypeInput
              name="hobbies"
              label="Hobbies"
              selectItems={[
                { label: 'Basket Ball', value: 'BBall' },
                { label: 'Drawing', value: 'Drawing' },
                {
                  label: 'TryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTryingTrying',
                  value: 'xyz'
                },
                { label: 'Trying a long phrase with spaces to try out different combinations', value: 'abcd' }
              ]}
            />
            <FormInput.CategorizedSelect
              name="sportsAndPokemon"
              label="Sports and Pokemon"
              items={[
                { label: 'BBall', value: 'bball', category: 'Sports' },
                { label: 'Soccer', value: 'soccer', category: 'Sports' },
                { label: 'Football', value: 'football', category: 'Sports' },
                { label: 'Pikachu', value: 'pikachu', category: 'Pokemon' },
                { label: 'Garchomp', value: 'garchomp', category: 'Pokemon' }
              ]}
              categorizedSelectProps={{
                items: [],
                creatableOption: {
                  creatableOptionLabel: 'Custom Option',
                  allowableCategoriesForNewOption: () => ['Sports', 'Pokemon']
                }
              }}
            />
            <FormInput.MultiInput name="multiInput" label="Multi Input" />
            <Button intent="primary" type="submit" text="Submit" />
          </FormikForm>
        )
      }}
    </Formik>
  </Container>
)

export const RadioGroups: Story<FormikFormProps> = () => (
  <Formik onSubmit={() => undefined} formName="radioButtons" initialValues={{}}>
    <FormikForm>
      <FormInput.RadioGroup
        name="example1"
        label="Basic"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        inline
        name="example2"
        label="Inline form input"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        radioGroup={{ inline: true }}
        name="example3"
        label="Inline RadioGroup"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        inline
        radioGroup={{ inline: true }}
        name="example4"
        label="Inline both"
        items={[
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' }
        ]}
      />

      <FormInput.RadioGroup
        name="example5"
        label="With elements as option labels"
        items={[
          {
            label: (
              <span>
                A <strong>BOLD</strong> option
              </span>
            ),
            value: 'opt1'
          },
          {
            label: (
              <span>
                An <em>ITALIC</em> option
              </span>
            ),
            value: 'opt2'
          },
          { label: <span style={{ transform: 'rotate(180deg)' }}>A strange option</span>, value: 'opt3' }
        ]}
      />

      <FormInput.RadioGroup
        name="example6"
        label="With option tooltip"
        items={[
          {
            label: 'Option 1',
            value: 'opt1',
            tooltipId: 'option1'
          },
          {
            label: 'Option 2',
            value: 'opt2',
            tooltipId: 'option2'
          }
        ]}
      />
    </FormikForm>
  </Formik>
)
