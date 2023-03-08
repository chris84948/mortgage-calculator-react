import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import './App.css';
import './components/NewMortgage.jsx'
import NewMortgage from './components/NewMortgage.jsx';
import ExistingMortgage from './components/ExistingMortgage.jsx';

function App() {
  return (
    <div className="App">
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>New Mortgage</Tab>
          <Tab>Existing Mortgage</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <NewMortgage />
          </TabPanel>
          <TabPanel>
            <ExistingMortgage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
