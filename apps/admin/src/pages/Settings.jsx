import React, {useState} from 'react'
import Tabs from '../design-system/Tabs'
import Card from '../design-system/Card'
import Input from '../design-system/Input'
import Select from '../design-system/Select'
import Button from '../design-system/Button'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('theme')

  const tabs = [
    {id: 'theme', label: 'Theme'},
    {id: 'api', label: 'API Keys'},
    {id: 'workspace', label: 'Workspace'},
  ]

  return (
    <div style={{padding: 20}}>
      <h1 style={{marginBottom: 24}}>Settings</h1>

      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />

      <Card>
        {activeTab === 'theme' && <ThemeSettings />}
        {activeTab === 'api' && <ApiKeysSettings />}
        {activeTab === 'workspace' && <WorkspaceSettings />}
      </Card>
    </div>
  )
}

function ThemeSettings() {
  const [colorScheme, setColorScheme] = useState('light')

  return (
    <div style={{display: 'grid', gap: 20, maxWidth: 500}}>
      <h3 style={{marginTop: 0}}>Theme Settings</h3>

      <Select
        label="Color Scheme"
        value={colorScheme}
        onChange={(e) => setColorScheme(e.target.value)}
        options={[
          {value: 'light', label: 'Light'},
          {value: 'dark', label: 'Dark'},
          {value: 'auto', label: 'Auto'},
        ]}
      />

      <div style={{display: 'flex', gap: 8}}>
        <Button variant="primary">Save Changes</Button>
        <Button variant="ghost">Reset</Button>
      </div>
    </div>
  )
}

function ApiKeysSettings() {
  const [sanityProject, setSanityProject] = useState('')
  const [sanityDataset, setSanityDataset] = useState('')

  return (
    <div style={{display: 'grid', gap: 20, maxWidth: 500}}>
      <h3 style={{marginTop: 0}}>API Keys</h3>

      <Input
        label="Sanity Project ID"
        value={sanityProject}
        onChange={(e) => setSanityProject(e.target.value)}
        placeholder="Enter project ID"
        hint="Found in your Sanity project settings"
      />

      <Input
        label="Sanity Dataset"
        value={sanityDataset}
        onChange={(e) => setSanityDataset(e.target.value)}
        placeholder="production"
        hint="Usually 'production' or 'development'"
      />

      <div style={{display: 'flex', gap: 8}}>
        <Button variant="primary">Save Keys</Button>
        <Button variant="ghost">Test Connection</Button>
      </div>
    </div>
  )
}

function WorkspaceSettings() {
  const [workspaceName, setWorkspaceName] = useState('')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('UTC')

  return (
    <div style={{display: 'grid', gap: 20, maxWidth: 500}}>
      <h3 style={{marginTop: 0}}>Workspace Configuration</h3>

      <Input
        label="Workspace Name"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        placeholder="My Workspace"
      />

      <Select
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        options={[
          {value: 'en', label: 'English'},
          {value: 'es', label: 'Spanish'},
          {value: 'fr', label: 'French'},
        ]}
      />

      <Select
        label="Timezone"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        options={[
          {value: 'UTC', label: 'UTC'},
          {value: 'America/New_York', label: 'Eastern Time'},
          {value: 'America/Los_Angeles', label: 'Pacific Time'},
        ]}
      />

      <div style={{display: 'flex', gap: 8}}>
        <Button variant="primary">Save Configuration</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}
