import {
  ChakraProvider,
  Heading,
  Grid,
  Center,
  VStack,
  Text
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Form from '../components/Form';
import Instructions from '../components/Instructions';
import Trial from '../components/Trial';
import Task from '../components/Task';
import { instructions } from '../instructions'
var _ = require('lodash')
import { MongoClient } from 'mongodb';


export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URL)

  const db = client.db('Cluster0')
  const res = await db.collection('trials').find({}).toArray()
  const json = JSON.parse(JSON.stringify(res))

  const blocks = _.flatten(['practice', _.shuffle(['eyes', 'mouth', 'nods', 'original'])])

  const data = 
    _.flatten(
      _.concat(
        blocks.map((b) => _.shuffle(_.filter(json, ['block', b])))
      )
    )

  const max_id = 
    _.max(
      _.map(
        _.flatten(
          _.compact(
            data.map(t => _.get(t, 'responses', 0))
          )
        ), 'subject'
      )
    )
  const subject = (_.isNull(max_id) || _.isUndefined(max_id)) ? 0 : max_id+1

  return {
      props: {
          subject: subject,
          trialList: data,
          instructionList: instructions,
          block_order: blocks
      },
  }
}


export default function App({ subject, trialList, instructionList, block_order }) {
  console.log(subject)
  const blockCounts = _.countBy(trialList, 'block')
  const nTrials = trialList.length
  const nPractice = blockCounts.practice
  const nDeviant = blockCounts.original
  
  const [count, setCount] = useState(0)
  const [view, setView] = useState('')
  const [kind, setKind] = useState('')

  const [age, setAge] = useState()
  const [sex, setSex] = useState()

  useEffect(() => {
    if (count == 0) {
      setKind('start')
    }
    else if (count == nPractice) {
      setKind('practice_end')
    }
    else if (count == nPractice+(nDeviant)) {
      setKind('break1')
    }
    else if (count == nPractice+(nDeviant*2)) {
      setKind('break2')
    }
    else if (count == nPractice+(nDeviant*3)) {
      setKind('break3')
    }
    else if (count == nTrials) {
      setKind('end')
    }
  }, [count])

  return (
    <ChakraProvider>
      <Grid minH='100vh' bg='#000000' textColor='#ffffff'>
        <Center>
          {
            (view == 'instructions')
            ?
            <Instructions
              content={instructionList}
              kind={kind}
              setView={setView} 
            />
            :
            (view == 'trial')
            ?
            <Trial 
              trial={trialList[count]}
              setView={setView} 
            />
            :
            (view == 'task')
            ?
            <Task
              trial={trialList[count]}
              count={count} 
              setCount={setCount} 
              setView={setView} 
              subject={subject}
              age={age}
              sex={sex}
              order={block_order}
              nTrials={nTrials}
              nDeviant={nDeviant}
              nPractice={nPractice}
            />
            :
            <VStack spacing={16}>
              <Heading>Welcome!</Heading>
              <Text>* Please fill in the form below and submit to start the experiment.</Text>
              <Form
                subject={subject}
                setSex={setSex}
                setAge={setAge} 
                setView={setView} 
              />
            </VStack>
          }
        </Center>
      </Grid>
    </ChakraProvider>
  );
};