import React, { useState } from 'react';

interface AccessKey {
  public_key: string;
  access_key: {
    permission: string;
  };
}

const SleetKey: React.FC = () => {
  const [accountId, setAccountId] = useState('');
  const [keys, setKeys] = useState<AccessKey[]>([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: accountId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result: AccessKey[] = await response.json();
      setKeys(result);
    } catch (error) {
      console.error('Error fetching the keys:', error);
    }
  };

  const saveKeys = () => {
    let markdownContent = `# ${accountId}\naccount keys\n`;

    keys.forEach((key, index) => {
      const keyType = key.access_key.permission === 'FullAccess' ? 'full' : 'limited';
      markdownContent += `## KEY NAME ${index + 1}\n${keyType}\n\`\`\`\n${key.public_key}\n\`\`\`\n`;
    });

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${accountId}.md`;
    a.click();
  };

  return (
    <div>
      <header>
        <h1>SLEET KEY</h1>
        <p>Label your NEAR account keys</p>

        <form className="key_search_form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="account.near"
            name="key_search_input"
            id="key_search_input"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <button type="submit">SEARCH</button>
        </form>
      </header>
      <article id="key_container">
        {keys.map((key, index) => (
          <div className="key_div" key={index}>
            <h2 contentEditable="true">KEY NAME {index + 1}</h2>
            <p className="key_type">{key.access_key.permission === 'FullAccess' ? 'full' : 'limited'}</p>
            <p className="ed25519">{key.public_key}</p>
          </div>
        ))}
      </article>
      <button className="key_save" onClick={saveKeys}>
        SAVE
      </button>
    </div>
  );
};

export default SleetKey;
