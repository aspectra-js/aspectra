import { provider } from 'aspectra'
import { application } from 'aspectra'
import { provide } from 'aspectra'
import { contextualize } from 'aspectra'
import { Context } from 'aspectra'

enum ContextIds {
  FILE_SYSTEM = 'file-system',
}

@contextualize(ContextIds.FILE_SYSTEM)
@provider
class FileSystemProvider {
  public appendFile(_path: string, _data: string) {
    // append to file
  }
}

// We want [Logger] to be available globally, so we contextualize it with [Context.global]
@contextualize(Context.global, ContextIds.FILE_SYSTEM)
@provider
class Logger {
  @provide(FileSystemProvider)
  private readonly fileSystem!: FileSystemProvider

  public log(message: string) {
    console.log(message)
    this.fileSystem.appendFile('log.txt', message)
  }
}

@application
class Application {
  // [Application] is not contextualized, but [Logger] can still be injected
  // because it is contextualized with [Context.global]
  @provide(Logger)
  private readonly logger!: Logger

  public start() {
    this.logger.log('Hello')
  }
}
