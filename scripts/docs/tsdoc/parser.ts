import { TSDocConfiguration, TSDocParser } from '@microsoft/tsdoc'
import { TSDocConfigFile } from '@microsoft/tsdoc-config'

const config = new TSDocConfiguration()
TSDocConfigFile.loadForFolder(import.meta.dirname).configureParser(config)

export const tsdocParser = new TSDocParser(config)
