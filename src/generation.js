/* Rules
    - F: Move drawing a line
    - +,-: Turn left/right
    - [,]: Push/Pop current state
*/
const presets = [
    {
        axiom: 'F',
        rules: [
            { symbol: 'F', odds: 0.33, newSymbols: 'F[+F]F[-F][F]' },
            { symbol: 'F', odds: 0.33, newSymbols: 'F[+F][F]' },
            { symbol: 'F', odds: 0.34, newSymbols: 'F[-F][F]' },
        ]
    },
    {
        axiom: 'X',
        rules: [
            { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
            { symbol: 'X', odds: 1.0, newSymbols: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]' },
        ]
    },
    {
        axiom: 'F',
        rules: [
            { symbol: 'F', odds: 1.0, newSymbols: 'FF+[+F-F-F]-[-F+F+F]' },
        ]
    },
    {
        axiom: 'X',
        rules: [
            { symbol: 'F', odds: 1.0, newSymbols: 'FX[FX[+XF]]' },
            { symbol: 'X', odds: 1.0, newSymbols: 'FF[+XZ++X-F[+ZX]][-X++F-X]' },
            { symbol: 'Z', odds: 1.0, newSymbols: '[+F-X-F][++ZX]' },
        ]
    },
    {
        axiom: 'F',
        rules: [
            { symbol: 'F', odds: 1.0, newSymbols: 'F[+F]F[-F]F' },
        ]
    },
    {
        axiom: 'X',
        rules: [
            { symbol: 'X', odds: 0.33, newSymbols: 'F[+X]F[-X]+X' },
            { symbol: 'X', odds: 0.33, newSymbols: 'F[-X]F[-X]+X' },
            { symbol: 'X', odds: 0.34, newSymbols: 'F[-X]F+X' },
            { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
        ]
    },
    {
        axiom: 'X',
        rules: [
            { symbol: 'X', odds: 1.0, newSymbols: 'F[-[[X]+X]]+F[+FX]-X' },
            { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
        ]
    },
    {
        axiom: 'FFX',
        rules: [
            { symbol: 'X', odds: 1.0, newSymbols: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]' },
            { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
        ]
    },
    {
        axiom: 'FX',
        rules: [
            { symbol: 'X', odds: 0.5, newSymbols: 'FFF[]+[]+[]+[]+[]+[]+[]-------[]-[]-[]-[]-[]-[]' },
            { symbol: 'X', odds: 0.5, newSymbols: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]' },
            { symbol: 'F', odds: 1.0, newSymbols: 'FF' },
        ]
    },
    {
        axiom: 'FAB',
        rules: [
            { symbol: 'A', odds: 1.0, newSymbols: '[+FB--FA][-F+A][B]' },
            { symbol: 'B', odds: 1.0, newSymbols: '[F+-FA][-BF+A]' },
        ]
    },
    {
        // L: Leave stem
        axiom: 'X',
        rules: [
            { symbol: 'L', odds: 0.8, newSymbols: '+F+[]--[]+F+[]--[]+F+[]--[]L' }, // Leave
            { symbol: 'L', odds: 0.2, newSymbols: '[]' }, // Leave end
            { symbol: 'X', odds: 0.33, newSymbols: 'F[+X]F[-:]+X' },
            { symbol: 'X', odds: 0.33, newSymbols: 'F[-L]F[-X]+X' },
            { symbol: 'X', odds: 0.34, newSymbols: 'F[-X]F+L' },
            //{ symbol: 'F', odds: 1.0, newSymbols: 'FF' },

        ]
    }
];

const globalPresets = [
    {
        backgroundColorTop: "#ddfafd",
        backgroundColorBottom: "#fecba9",
        preset: 1,
        iterations: 3,
        variability: 0.1,
        seed: 25,
        isAnimated: false,
        leafColor: "#5edb3b",
        leafType: 0,
        leafLength: 10,
        leafWidth: 5,
        leafAlpha: 0.75,
        branchColor: "#7d5010",
        branchLength: 30,
        branchAngle: 22.5,
        branchWidth: 6,
        branchWidthFalloff: 0.7, 
        branchWidthMin: 0.2
    },
    {
        backgroundColorTop: "#1b44a1",
        backgroundColorBottom: "#ff7452",
        preset: 1,
        iterations: 3,
        variability: 0.38,
        seed: 17,
        isAnimated: false,
        leafColor: "#f9f110",
        leafType: 1,
        leafLength: 13.5,
        leafWidth: 11.5,
        leafAlpha: 0.73,
        branchColor: "#7d5010",
        branchLength: 26.5,
        branchAngle: 19.6,
        branchWidth: 13.3,
        branchWidthFalloff: 0.74, 
        branchWidthMin: 3.3
    },
    {
        backgroundColorTop: "#c4e8ee",
        backgroundColorBottom: "#ffffff",
        preset: 1,
        iterations: 4,
        variability: 0.55,
        seed: 27,
        isAnimated: false,
        leafColor: "#ff8fe7",
        leafType: 0,
        leafLength: 8.5,
        leafWidth: 12.5,
        leafAlpha: 0.76,
        branchColor: "#504534",
        branchLength: 15.5,
        branchAngle: 27.1,
        branchWidth: 38.8,
        branchWidthFalloff: 0.56, 
        branchWidthMin: 2.7
    },
    {
        backgroundColorTop: "#ebebeb",
        backgroundColorBottom: "#c7dfff",
        preset: 4,
        iterations: 2,
        variability: 0.16,
        seed: 39,
        isAnimated: false,
        leafColor: "#b76f0b",
        leafType: 2,
        leafLength: 16.5,
        leafWidth: 10.5,
        leafAlpha: 1,
        branchColor: "#3dc60c",
        branchLength: 68.5,
        branchAngle: 27.8,
        branchWidth: 8.4,
        branchWidthFalloff: 0.53, 
        branchWidthMin: 0.1
    },
    {
        backgroundColorTop: "#eedddf",
        backgroundColorBottom: "#81c589",
        preset: 7,
        iterations: 3,
        variability: 0.1,
        seed: 25,
        isAnimated: false,
        leafColor: "#215a11",
        leafType: 1,
        leafLength: 16.5,
        leafWidth: 3.5,
        leafAlpha: 0.63,
        branchColor: "#7d5010",
        branchLength: 18.5,
        branchAngle: 29.9,
        branchWidth: 24.1,
        branchWidthFalloff: 0.46, 
        branchWidthMin: 0.1
    },
    {
        backgroundColorTop: "#72bedf",
        backgroundColorBottom: "#ffdeb8",
        preset: 6,
        iterations: 4,
        variability: 0.4,
        seed: 39,
        isAnimated: false,
        leafColor: "#227b0a",
        leafType: 2,
        leafLength: 10.5,
        leafWidth: 0.5,
        leafAlpha: 0.57,
        branchColor: "#7d5010",
        branchLength: 12.5,
        branchAngle: 19.6,
        branchWidth: 20,
        branchWidthFalloff: 0.64, 
        branchWidthMin: 0.1
    },
    {
        backgroundColorTop: "#260330",
        backgroundColorBottom: "#110113",
        preset: 2,
        iterations: 2,
        variability: 0.29,
        seed: 23,
        isAnimated: false,
        leafColor: "#b73615",
        leafType: 1,
        leafLength: 3.5,
        leafWidth: 8.5,
        leafAlpha: 0.88,
        branchColor: "#95f7bf",
        branchLength: 52.5,
        branchAngle: 7.6,
        branchWidth: 6.2,
        branchWidthFalloff: 0.63, 
        branchWidthMin: 1
    },
    {
        backgroundColorTop: "#e3de64",
        backgroundColorBottom: "#e3de64",
        preset: 6,
        iterations: 4,
        variability: 0.09,
        seed: 20,
        isAnimated: false,
        leafColor: "#24a5e5",
        leafType: 0,
        leafLength: 17.5,
        leafWidth: 6.5,
        leafAlpha: 0.54,
        branchColor: "#1e74a9",
        branchLength: 16.5,
        branchAngle: 5.1,
        branchWidth: 24.6,
        branchWidthFalloff: 0.33, 
        branchWidthMin: 8.9
    },
    {
        backgroundColorTop: "#e3de64",
        backgroundColorBottom: "#e3de64",
        preset: 2,
        iterations: 3,
        variability: 0,
        seed: 46,
        isAnimated: false,
        leafColor: "#d72d2d",
        leafType: 1,
        leafLength: 13.5,
        leafWidth: 13.5,
        leafAlpha: 0.72,
        branchColor: "#3c3afc",
        branchLength: 47.5,
        branchAngle: 90,
        branchWidth: 19.3,
        branchWidthFalloff: 0.76, 
        branchWidthMin: 6.4
    }
]

let lastTimeout = null;

function OnRandomize()
{
    let rng = new RNG();
    const setRandomValue = (input) => {
        const val = rng.nextFloatRange(parseFloat(input.min), parseFloat(input.max));
        input.value = val;
    }

    const setRandomRange = (input, min, max) => {
        const val = rng.nextFloatRange(parseFloat(min), parseFloat(max));
        input.value = val;
    }

    const setRandomColor = (input) => {
        input.value = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    //setRandomColor(document.getElementById("background-col-top"));
    //setRandomColor(document.getElementById("background-col-bottom"));
    setRandomColor(document.getElementById("leaves-col"));
    setRandomColor(document.getElementById("branches-col"));

    setRandomValue(document.getElementById("presets"));
    setRandomValue(document.getElementById("variability"));
    setRandomValue(document.getElementById("seed"));

    setRandomValue(document.getElementById("leaves-type"));
    setRandomValue(document.getElementById("leaves-length"));
    setRandomValue(document.getElementById("leaves-width"));
    setRandomValue(document.getElementById("leaves-alpha"));

    setRandomRange(document.getElementById("branches-length"), 30, 50);
    setRandomValue(document.getElementById("branches-angle"));
    setRandomValue(document.getElementById("branches-width"));
    setRandomValue(document.getElementById("branches-width-falloff"));
    setRandomValue(document.getElementById("branches-min-width"));

    Run();
}

function LoadGlobalPreset()
{
    const preset = globalPresets[parseInt(document.getElementById("globalPresets").value)];

    // Params
    document.getElementById("background-col-top").value = preset.backgroundColorTop;
    document.getElementById("background-col-bottom").value = preset.backgroundColorBottom;
    document.getElementById("presets").value = preset.preset;
    document.getElementById("iterations").value = preset.iterations;
    document.getElementById("variability").value = preset.variability;
    document.getElementById("seed").value = preset.seed;

    document.getElementById("leaves-col").value = preset.leafColor;
    document.getElementById("leaves-type").value = preset.leafType;
    document.getElementById("leaves-length").value = preset.leafLength;
    document.getElementById("leaves-width").value = preset.leafWidth;
    document.getElementById("leaves-alpha").value = preset.leafAlpha;

    document.getElementById("branches-col").value = preset.branchColor;
    document.getElementById("branches-length").value = preset.branchLength;
    document.getElementById("branches-angle").value = preset.branchAngle;
    document.getElementById("branches-width").value = preset.branchWidth;
    document.getElementById("branches-width-falloff").value = preset.branchWidthFalloff;
    document.getElementById("branches-min-width").value = preset.branchWidthMin;
}

function Run(useUserSentence = false)
{
    let config = {};
    // Params
    config.backgroundColorTop = document.getElementById("background-col-top").value;
    config.backgroundColorBottom = document.getElementById("background-col-bottom").value;
    config.preset = document.getElementById("presets").valueAsNumber;
    config.iterations = document.getElementById("iterations").valueAsNumber;
    config.variability = document.getElementById("variability").valueAsNumber;
    config.seed = document.getElementById("seed").valueAsNumber;
    config.isAnimated = document.getElementById("animate").checked;

    config.leafColor = document.getElementById("leaves-col").value;
    config.leafType = document.getElementById("leaves-type").valueAsNumber;
    config.leafLength = document.getElementById("leaves-length").valueAsNumber;
    config.leafWidth = document.getElementById("leaves-width").valueAsNumber;
    config.leafAlpha = document.getElementById("leaves-alpha").valueAsNumber;

    config.branchColor = document.getElementById("branches-col").value;
    config.branchLength = document.getElementById("branches-length").valueAsNumber;
    config.branchAngle = document.getElementById("branches-angle").valueAsNumber;
    config.branchWidth = document.getElementById("branches-width").valueAsNumber;
    config.branchWidthFalloff = document.getElementById("branches-width-falloff").valueAsNumber;
    config.branchWidthMin = document.getElementById("branches-min-width").valueAsNumber;

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

function SelectRule(config, matchingRules)
{
    const chance = config.rng.nextFloat();
    let total = 0;

    for (let rule of matchingRules)
    {
        total += rule.odds;
        if (chance < total)
            return rule;
    }
    
    return '';
}

function ApplyRulesToSentence(config, sentence)
{
    let newSentence = '';

    for (let i=0; i<sentence.length; ++i)
    {
        const c = sentence[i];

        let matchingRules = [];
        for (let rule of config.rules)
        {
            if (c == rule.symbol)
                matchingRules.push(rule);
        }

        if (matchingRules.length > 0)
        {
            const selectedRule = SelectRule(config, matchingRules);
            newSentence += selectedRule.newSymbols;
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

    const leafWidth = config.rng.nextFloatRange(
        config.leafWidth * (1 - config.variability),
        config.leafWidth * (1 + config.variability));

    const leafLength = config.rng.nextFloatRange(
        config.leafLength * (1 - config.variability),
        config.leafLength * (1 + config.variability));

    ctx.scale(leafWidth, leafLength);

    if (config.leafType == 0)
    {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(1, -1);
        ctx.lineTo(0, -4);
        ctx.lineTo(-1, -1);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
    }
    else if (config.leafType == 1)
    {
        ctx.beginPath();
        ctx.arc(0, -2, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    else if (config.leafType == 2)
    {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(1, -1);
        ctx.lineTo(1, -4);
        ctx.lineTo(0, -5);
        ctx.lineTo(-1, -4);
        ctx.lineTo(-1, -1);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillRect(0, 0, 0.25, -5);
    }
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
    
    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
    grad.addColorStop(0, config.backgroundColorTop);
    grad.addColorStop(1, config.backgroundColorBottom);

    ctx.fillStyle = grad;
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

function OnGlobalPresetChanged()
{
    LoadGlobalPreset();
    Run();
}

Run();