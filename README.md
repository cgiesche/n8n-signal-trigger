# n8n Signal Trigger

A Signal CLI REST Trigger node for [n8n](https://n8n.io/) that listens to incoming Signal messages using the signal-cli-rest-api.

## Features

- Connects to a WebSocket endpoint for Signal messages.
- Reconnects automatically on connection loss.
- Emits messages to n8n workflows.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/cgiesche/n8n-signal-trigger.git
   cd n8n-signal-trigger
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Build

To compile the TypeScript code and copy the Signal logo to the distribution folder, run:
```sh
npm run build
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome. Please open issues or pull requests on GitHub.