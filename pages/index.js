// pages/index.js
import { registerRootComponent } from 'expo';
import App from '../App';

registerRootComponent(App);

export default function Main() {
  return null; // App запускается через registerRootComponent
}
