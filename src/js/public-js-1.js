// Imports entire files as module
import 'helper-4';

import 'helper-1'; // Wasted import (Check helper-1.js)
import { honeySyrup } from 'helper-1'; // Only imports fn honeySyrup

// Only default fn is included. Good for treeshaking
import someDefaultFn from 'helper-3';

// Use ES modules for importing parts of .js files. Tree shaking for that file.
import defaultBear, { helper as smallBear } from 'helpers/helper-2';


grizzlyBear(); // Error: grizzlyBear is not available from 'helper-1'
honeySyrup(); // Call the fn, otherwise it would be removed from iife

smallBear(); // Call the fn, otherwise it would be removed from iife

someDefaultFn();