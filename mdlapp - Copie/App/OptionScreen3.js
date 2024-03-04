import * as React from 'react';
import { Form, Text } from 'react-native';
import { loadAuth2, loadAuth2WithProps, loadClientAuth2 } from 'gapi-script';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { authenticate, loadClient, execute} from './OptionScreen1.js';

export default function OptionScreen() {
    return (
      <SafeAreaView>
        <Button onclick="authenticate().then(loadClient)">authorize and load</Button>
        <Button onclick="execute()">execute</Button>
      </SafeAreaView>
    )
}