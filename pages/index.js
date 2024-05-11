import {
  ChakraProvider,
  Heading,
  Grid,
  Center,
  VStack
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Form from '../components/Form';
import Instructions from '../components/Instructions';
import Trial from '../components/Trial';
import { instructions } from '../instructions'
// import fetch from 'isomorphic-unfetch'
var _ = require('lodash')
import { MongoClient } from 'mongodb';


export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URL)

  const db = client.db('Cluster0')
  const res = await db.collection('trials').find({}).toArray()
  const json = JSON.parse(JSON.stringify(res))

  const blocks = _.flatten(['practice', _.shuffle(['eyes', 'mouth', 'nods', 'original'])])

  const data = _.flatten(
    _.concat(
      blocks.map((b) => _.shuffle(_.filter(json, ['block', b])))
    )
  )

  const max_id = _.max(
    _.map(
      _.flatten(
        _.compact(
          data.map(t => _.get(t, 'responses', 0))
        )
      ), 'subject'
    )
  )
  const subject = max_id ? max_id+1 : 0

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

  const nTrials = trialList.length

  const [view, setView] = useState('')
  const [count, setCount] = useState(0)
  const [kind, setKind] = useState('')

  const [age, setAge] = useState()
  const [sex, setSex] = useState()

  useEffect(() => {
    if (count == 0) {
      setKind('start')
    }
    else if (count == nTrials) {
      setKind('end')
    }
    else if (count == 4) {
      setKind('practice_end')
    }
    else if (count == 44) {
      setKind('break1')
    }
    else if (count == 84) {
      setKind('break2')
    }
    else if (count == 124) {
      setKind('break3')
    }
    else {
      setKind('trial')
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
              count={count} 
              setCount={setCount} 
              setView={setView} 
              subject={subject}
              age={age}
              sex={sex}
              order={block_order}
            />
            :
            <VStack spacing={16}>
              <Heading>Speed Dating Experiment - Masking</Heading>
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