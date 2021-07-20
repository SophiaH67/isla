const password = 'u55jXbpmPhCgC8Hr55'

export const runAsRoot = (command: string[]) =>
  Deno.run({
    cmd: ['bash', '-c', `echo ${password} | su isla -c "/bin/sudo ${command.map((arg) => `'${arg}' `).join(' ')}"`],
    stdout: 'piped',
    stderr: 'piped',
    stdin: 'null',
  })

export const runAsIsla = (command: string[], stdout: number | 'piped' | 'inherit' | 'null' | undefined = 'piped') =>
  Deno.run({
    cmd: ['bash', '-c', `echo ${password} | su isla -c "${command.map((arg) => `'${arg}' `).join(' ')}"`],
    stdout: stdout,
    stderr: 'piped',
    stdin: 'null',
  })

export const message = async (type: 'error' | 'success', message: string) =>
  await (await fetch(`https://isla-master.marnixah.com/quotes/${type}/${message}`)).text()
