/* Rules
    - F: Move drawing a line
    - +,-: Turn left/right
    - [,]: Push/Pop current state
*/
const presets = [
    {
        axiom: 'X',
        rules: [
            ['F', 'FF'],
            ['X', 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]'],
        ]
    },
    {
        axiom: 'FX',
        rules: [
            ['F', 'FF+[+F-F-F]-[-F+F+F]'],
        ]
    },
    {
        axiom: 'X',
        rules: [
            ['F', 'FX[FX[+XF]]'],
            ['X', 'FF[+XZ++X-F[+ZX]][-X++F-X]'],
            ['Z', '[+F-X-F][++ZX]'],
        ]
    },
    {
        axiom: 'F',
        rules: [
            ['F', 'FF[+F]F[-F]F'],
        ]
    },
];

let lastTimeout = null;

function Run(useUserSentence = false)
{
    let config = {};
    // Params
    config.backgroundColor = document.getElementById("background-col").value;
    config.preset = document.getElementById("presets").valueAsNumber;
    config.iterations = document.getElementById("iterations").valueAsNumber;
    config.variability = document.getElementById("variability").valueAsNumber;
    config.seed = document.getElementById("seed").valueAsNumber;
    config.isAnimated = document.getElementById("animate").checked;

    config.leafColor = document.getElementById("leaves-col").value;
    config.leafLength = document.getElementById("leaves-length").valueAsNumber;
    config.leafWidth = document.getElementById("leaves-width").valueAsNumber;
    config.leafAlpha = document.getElementById("leaves-alpha").valueAsNumber;

    config.branchColor = document.getElementById("branches-col").value;
    config.branchLength = document.getElementById("branches-length").valueAsNumber;
    config.branchAngle = document.getElementById("branches-angle").valueAsNumber;
    config.branchWidth = document.getElementById("branches-width").valueAsNumber;
    config.branchWidthMin = document.getElementById("branches-min-width").valueAsNumber;
    config.branchWidthFalloff = document.getElementById("branches-width-falloff").valueAsNumber;

    config.rng = new RNG(config.seed);

    // Select preset
    const preset = presets[config.preset];
    config.rules = preset.rules;

    if (useUserSentence)
    {
        const textArea = document.getElementById("sentence");
        config.sentence = textArea.value;
    }
    else
    {
        config.sentence = preset.axiom;
        ApplyRules(config);
    }

    const iterator = Render(config, !useUserSentence);

    clearTimeout(lastTimeout);

    if (config.isAnimated)
    {
        const QueueRender = () =>
        {
            if (!iterator.next().done)
            {
                lastTimeout = window.setTimeout(QueueRender, 0);
            }
        }

        QueueRender();
        
    }
    else
    {
        while (!iterator.next().done);
    }
    
}

function FindMatchingrule(config, c)
{
    for (let rule of config.rules)
    {
        if (c == rule[0])
            return rule;
    }

    return null;
}

function ApplyRulesToSentence(config, sentence)
{
    let newSentence = '';

    for (let i=0; i<sentence.length; ++i)
    {
        const c = sentence[i];

        const rule = FindMatchingrule(config, c);
        if (rule)
        {
            newSentence += rule[1];
        }
        else
        {
            newSentence += c;
        }
    }

    return newSentence;
}

function ApplyRules(config)
{
    let currentSentence = config.sentence;
    for (let i=0; i<config.iterations; i++)
    {
        currentSentence = ApplyRulesToSentence(config, currentSentence);
    }

    config.sentence = currentSentence;
}

function RenderLeaf(ctx, config)
{
    ctx.fillStyle = config.leafColor;
    ctx.globalAlpha = config.leafAlpha;

    const scaleChange = config.rng.nextFloatRange(1 - (config.variability * 0.1), 1 + (config.variability * 1));
    const lengthChange = config.rng.nextFloatRange(1 - (config.variability * 0.1), 1 + (config.variability * 1));

    ctx.scale(config.leafWidth * scaleChange, config.leafLength * lengthChange);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1, -1);
    ctx.lineTo(0, -4);
    ctx.lineTo(-1, -1);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
}

function RenderBranch(ctx, startWidth, endWidth, length)
{
    ctx.beginPath();
    ctx.moveTo(-endWidth / 2, -length - 1);
    ctx.lineTo(-startWidth / 2, 1);
    ctx.lineTo(startWidth / 2, 1);
    ctx.lineTo(endWidth / 2, -length - 1);
    ctx.lineTo(-endWidth / 2, -length - 1);
    ctx.closePath();
    ctx.fill();
}

function* Render(config, updateSentence = false)
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.transform(1, 0, 0, 1, canvas.width / 2, canvas.height);

    const textArea = document.getElementById("sentence");
    if (updateSentence)
        textArea.value = "";

    const stateStack = [];
    let state = {
        width: config.branchWidth
    }

    for (let i=0; i<config.sentence.length; ++i)
    {
        yield;
        const c = config.sentence[i];

        if (updateSentence)
            textArea.value += c;

        if (c == 'F')
        {
            ctx.fillStyle = config.branchColor;
            const startWidth = state.width;
            const fallOff = (1 - config.branchWidthFalloff);
            const endWidth = Math.max(startWidth * Math.pow(fallOff, 0.1), config.branchWidthMin);
            state.width = endWidth;

            const lengthChange = config.rng.nextFloatRange(1 - config.variability, 1 + config.variability);
            const length = config.branchLength * lengthChange;
            RenderBranch(ctx, startWidth, endWidth,length);
            ctx.transform(1, 0, 0, 1, 0, -length);
        }
        else if (c == '+')
        {
            const rotChange = config.rng.nextFloatRange(1 - config.variability, 1 + config.variability);
            ctx.rotate(config.branchAngle * Math.PI / 180 * rotChange);
        }
        else if (c == '-')
        {
            const rotChange = config.rng.nextFloatRange(1 - config.variability, 1 + config.variability);
            ctx.rotate(-config.branchAngle * Math.PI / 180 * rotChange);
        }
        else if (c == '[')
        {
            ctx.save();
            stateStack.push({...state}); // Deep copy of state
        }
        else if (c == ']')
        {
            RenderLeaf(ctx, config);
            ctx.restore();
            state = stateStack.pop();
        }
    }
}

function OnParamsChanged()
{
    Run();
}

function OnSentenceChanged()
{
    Run(true);
}

Run();