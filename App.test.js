```js
const {describe, it, expect} = require('@jest/globals');
const sinon = require('sinon');

describe('JobFunction', () => {
    let clock;
    let jobFunction;

    beforeEach(() => {
        // Stub out console methods
        clock = sinon.useFakeTimers();
        sinon.stub(console, 'debug');
        sinon.stub(console, 'error');
        jobFunction = require('./jobFunction');
    });

    afterEach(() => {
        // Restore original console methods and clock
        sinon.restore();
        clock.restore();
    });

    it('should log debug messages at the start and end of job_function', () => {
        jobFunction.job_function();
        expect(console.debug.calledWith('Starting job_function')).toBe(true);
        expect(console.debug.calledWith('Completed job_function')).toBe(true);
    });

    it('should log an error message if an exception is thrown within job_function', () => {
        const errorMessage = 'Test error message';
        const throwFunction = () => { throw new Error(errorMessage); };
        sinon.stub(jobFunction, 'job_function').callsFake(throwFunction);

        try {
            jobFunction.job_function();
        } catch (_) {}

        expect(console.error.calledWith(`Error in job_function: ${errorMessage}`)).toBe(true);
    });
});
```