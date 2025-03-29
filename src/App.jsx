import { useState } from 'react';

function App() {
  const [aliases, setAliases] = useState([]);
  const [aliasName, setAliasName] = useState('');
  const [command, setCommand] = useState('');

  const addAlias = () => {
    if (!aliasName || !command) return;
    setAliases([...aliases, { aliasName, command }]);
    setAliasName('');
    setCommand('');
  };

  const downloadZshrc = () => {
    const content = aliases
      .map(({ aliasName, command }) => `alias ${aliasName}='${command}'`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '.zshrc';
    link.click();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1>alias-gen-tool</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Alias name (e.g., gs)"
          value={aliasName}
          onChange={(e) => setAliasName(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Command (e.g., git status)"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button onClick={addAlias} style={{ marginLeft: '0.5rem' }}>
          Add
        </button>
      </div>

      <ul>
        {aliases.map(({ aliasName, command }, index) => (
          <li key={index}>
            <code>
              alias {aliasName}='{command}'
            </code>
          </li>
        ))}
      </ul>

      {aliases.length > 0 && (
        <button onClick={downloadZshrc} style={{ marginTop: '1rem' }}>
          Download .zshrc
        </button>
      )}
    </div>
  );
}

export default App;
