use std::collections::HashMap;

use once_cell::sync::Lazy;
use regex::Regex;
use serde::{Deserialize, Serialize};

// ---------------------------------------------------------------------------
// Data structures
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize)]
pub struct Violation {
    #[serde(rename = "type")]
    pub violation_type: String,
    pub rule: String,
    #[serde(rename = "match")]
    pub match_text: String,
    pub context: String,
    pub penalty: i32,
}

#[derive(Debug, Clone, Serialize)]
pub struct AnalysisResult {
    pub score: i32,
    pub band: String,
    pub word_count: usize,
    pub violations: Vec<Violation>,
    pub counts: HashMap<String, usize>,
    pub total_penalty: i32,
    pub weighted_sum: f64,
    pub density: f64,
    pub advice: Vec<String>,
}

// ---------------------------------------------------------------------------
// Hyperparameters
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Hyperparameters {
    pub concentration_alpha: f64,
    pub decay_lambda: f64,
    pub claude_categories: Vec<String>,
    pub context_window_chars: usize,
    pub short_text_word_count: usize,
    pub repeated_ngram_min_n: usize,
    pub repeated_ngram_max_n: usize,
    pub repeated_ngram_min_count: usize,
    pub slop_word_penalty: i32,
    pub slop_phrase_penalty: i32,
    pub structural_bold_header_min: usize,
    pub structural_bold_header_penalty: i32,
    pub structural_bullet_run_min: usize,
    pub structural_bullet_run_penalty: i32,
    pub triadic_record_cap: usize,
    pub triadic_penalty: i32,
    pub triadic_advice_min: usize,
    pub tone_penalty: i32,
    pub sentence_opener_penalty: i32,
    pub weasel_penalty: i32,
    pub ai_disclosure_penalty: i32,
    pub placeholder_penalty: i32,
    pub rhythm_min_sentences: usize,
    pub rhythm_cv_threshold: f64,
    pub rhythm_penalty: i32,
    pub em_dash_words_basis: f64,
    pub em_dash_density_threshold: f64,
    pub em_dash_penalty: i32,
    pub contrast_record_cap: usize,
    pub contrast_penalty: i32,
    pub contrast_advice_min: usize,
    pub setup_resolution_record_cap: usize,
    pub setup_resolution_penalty: i32,
    pub colon_words_basis: f64,
    pub colon_density_threshold: f64,
    pub colon_density_penalty: i32,
    pub pithy_max_sentence_words: usize,
    pub pithy_record_cap: usize,
    pub pithy_penalty: i32,
    pub bullet_density_threshold: f64,
    pub bullet_density_penalty: i32,
    pub blockquote_min_lines: usize,
    pub blockquote_free_lines: usize,
    pub blockquote_cap: usize,
    pub blockquote_penalty_step: i32,
    pub bold_bullet_run_min: usize,
    pub bold_bullet_run_penalty: i32,
    pub horizontal_rule_min: usize,
    pub horizontal_rule_penalty: i32,
    pub phrase_reuse_record_cap: usize,
    pub phrase_reuse_penalty: i32,
    pub density_words_basis: f64,
    pub score_min: i32,
    pub score_max: i32,
    pub band_clean_min: i32,
    pub band_light_min: i32,
    pub band_moderate_min: i32,
    pub band_heavy_min: i32,
}

impl Default for Hyperparameters {
    fn default() -> Self {
        Self {
            concentration_alpha: 2.5,
            decay_lambda: 0.04,
            claude_categories: vec![
                "contrast_pairs".to_string(),
                "pithy_fragment".to_string(),
                "setup_resolution".to_string(),
            ],
            context_window_chars: 60,
            short_text_word_count: 10,
            repeated_ngram_min_n: 4,
            repeated_ngram_max_n: 8,
            repeated_ngram_min_count: 3,
            slop_word_penalty: -2,
            slop_phrase_penalty: -3,
            structural_bold_header_min: 3,
            structural_bold_header_penalty: -5,
            structural_bullet_run_min: 6,
            structural_bullet_run_penalty: -3,
            triadic_record_cap: 5,
            triadic_penalty: -1,
            triadic_advice_min: 3,
            tone_penalty: -3,
            sentence_opener_penalty: -2,
            weasel_penalty: -2,
            ai_disclosure_penalty: -10,
            placeholder_penalty: -5,
            rhythm_min_sentences: 5,
            rhythm_cv_threshold: 0.3,
            rhythm_penalty: -5,
            em_dash_words_basis: 150.0,
            em_dash_density_threshold: 1.0,
            em_dash_penalty: -3,
            contrast_record_cap: 5,
            contrast_penalty: -1,
            contrast_advice_min: 2,
            setup_resolution_record_cap: 5,
            setup_resolution_penalty: -3,
            colon_words_basis: 150.0,
            colon_density_threshold: 1.5,
            colon_density_penalty: -3,
            pithy_max_sentence_words: 6,
            pithy_record_cap: 3,
            pithy_penalty: -2,
            bullet_density_threshold: 0.40,
            bullet_density_penalty: -8,
            blockquote_min_lines: 3,
            blockquote_free_lines: 2,
            blockquote_cap: 4,
            blockquote_penalty_step: -3,
            bold_bullet_run_min: 3,
            bold_bullet_run_penalty: -5,
            horizontal_rule_min: 4,
            horizontal_rule_penalty: -3,
            phrase_reuse_record_cap: 5,
            phrase_reuse_penalty: -1,
            density_words_basis: 1000.0,
            score_min: 0,
            score_max: 100,
            band_clean_min: 80,
            band_light_min: 60,
            band_moderate_min: 40,
            band_heavy_min: 20,
        }
    }
}

/// Partial override — all fields optional. Only specified fields replace defaults.
#[derive(Debug, Default, Deserialize)]
pub struct HyperparametersOverride {
    pub concentration_alpha: Option<f64>,
    pub decay_lambda: Option<f64>,
    pub claude_categories: Option<Vec<String>>,
    pub context_window_chars: Option<usize>,
    pub short_text_word_count: Option<usize>,
    pub repeated_ngram_min_n: Option<usize>,
    pub repeated_ngram_max_n: Option<usize>,
    pub repeated_ngram_min_count: Option<usize>,
    pub slop_word_penalty: Option<i32>,
    pub slop_phrase_penalty: Option<i32>,
    pub structural_bold_header_min: Option<usize>,
    pub structural_bold_header_penalty: Option<i32>,
    pub structural_bullet_run_min: Option<usize>,
    pub structural_bullet_run_penalty: Option<i32>,
    pub triadic_record_cap: Option<usize>,
    pub triadic_penalty: Option<i32>,
    pub triadic_advice_min: Option<usize>,
    pub tone_penalty: Option<i32>,
    pub sentence_opener_penalty: Option<i32>,
    pub weasel_penalty: Option<i32>,
    pub ai_disclosure_penalty: Option<i32>,
    pub placeholder_penalty: Option<i32>,
    pub rhythm_min_sentences: Option<usize>,
    pub rhythm_cv_threshold: Option<f64>,
    pub rhythm_penalty: Option<i32>,
    pub em_dash_words_basis: Option<f64>,
    pub em_dash_density_threshold: Option<f64>,
    pub em_dash_penalty: Option<i32>,
    pub contrast_record_cap: Option<usize>,
    pub contrast_penalty: Option<i32>,
    pub contrast_advice_min: Option<usize>,
    pub setup_resolution_record_cap: Option<usize>,
    pub setup_resolution_penalty: Option<i32>,
    pub colon_words_basis: Option<f64>,
    pub colon_density_threshold: Option<f64>,
    pub colon_density_penalty: Option<i32>,
    pub pithy_max_sentence_words: Option<usize>,
    pub pithy_record_cap: Option<usize>,
    pub pithy_penalty: Option<i32>,
    pub bullet_density_threshold: Option<f64>,
    pub bullet_density_penalty: Option<i32>,
    pub blockquote_min_lines: Option<usize>,
    pub blockquote_free_lines: Option<usize>,
    pub blockquote_cap: Option<usize>,
    pub blockquote_penalty_step: Option<i32>,
    pub bold_bullet_run_min: Option<usize>,
    pub bold_bullet_run_penalty: Option<i32>,
    pub horizontal_rule_min: Option<usize>,
    pub horizontal_rule_penalty: Option<i32>,
    pub phrase_reuse_record_cap: Option<usize>,
    pub phrase_reuse_penalty: Option<i32>,
    pub density_words_basis: Option<f64>,
    pub score_min: Option<i32>,
    pub score_max: Option<i32>,
    pub band_clean_min: Option<i32>,
    pub band_light_min: Option<i32>,
    pub band_moderate_min: Option<i32>,
    pub band_heavy_min: Option<i32>,
}

impl Hyperparameters {
    pub fn with_overrides(mut self, ov: &HyperparametersOverride) -> Self {
        macro_rules! apply {
            ($($field:ident),* $(,)?) => {
                $(if let Some(ref v) = ov.$field { self.$field = v.clone(); })*
            };
        }
        apply!(
            concentration_alpha,
            decay_lambda,
            claude_categories,
            context_window_chars,
            short_text_word_count,
            repeated_ngram_min_n,
            repeated_ngram_max_n,
            repeated_ngram_min_count,
            slop_word_penalty,
            slop_phrase_penalty,
            structural_bold_header_min,
            structural_bold_header_penalty,
            structural_bullet_run_min,
            structural_bullet_run_penalty,
            triadic_record_cap,
            triadic_penalty,
            triadic_advice_min,
            tone_penalty,
            sentence_opener_penalty,
            weasel_penalty,
            ai_disclosure_penalty,
            placeholder_penalty,
            rhythm_min_sentences,
            rhythm_cv_threshold,
            rhythm_penalty,
            em_dash_words_basis,
            em_dash_density_threshold,
            em_dash_penalty,
            contrast_record_cap,
            contrast_penalty,
            contrast_advice_min,
            setup_resolution_record_cap,
            setup_resolution_penalty,
            colon_words_basis,
            colon_density_threshold,
            colon_density_penalty,
            pithy_max_sentence_words,
            pithy_record_cap,
            pithy_penalty,
            bullet_density_threshold,
            bullet_density_penalty,
            blockquote_min_lines,
            blockquote_free_lines,
            blockquote_cap,
            blockquote_penalty_step,
            bold_bullet_run_min,
            bold_bullet_run_penalty,
            horizontal_rule_min,
            horizontal_rule_penalty,
            phrase_reuse_record_cap,
            phrase_reuse_penalty,
            density_words_basis,
            score_min,
            score_max,
            band_clean_min,
            band_light_min,
            band_moderate_min,
            band_heavy_min,
        );
        self
    }
}

// ---------------------------------------------------------------------------
// Rule names constant
// ---------------------------------------------------------------------------

pub const RULE_NAMES: &[&str] = &[
    "slop_words",
    "slop_phrases",
    "structural",
    "tone",
    "weasel",
    "ai_disclosure",
    "placeholder",
    "rhythm",
    "em_dash",
    "contrast_pairs",
    "colon_density",
    "pithy_fragment",
    "setup_resolution",
    "bullet_density",
    "blockquote_density",
    "bold_bullet_list",
    "horizontal_rules",
    "phrase_reuse",
];

// ---------------------------------------------------------------------------
// Compiled patterns
// ---------------------------------------------------------------------------

static SLOP_WORD_RE: Lazy<Regex> = Lazy::new(|| {
    let words = [
        // Adjectives
        "crucial",
        "groundbreaking",
        "pivotal",
        "paramount",
        "seamless",
        "holistic",
        "multifaceted",
        "meticulous",
        "profound",
        "comprehensive",
        "invaluable",
        "notable",
        "noteworthy",
        "game-changing",
        "revolutionary",
        "pioneering",
        "visionary",
        "formidable",
        "quintessential",
        "unparalleled",
        "stunning",
        "breathtaking",
        "captivating",
        "nestled",
        "robust",
        "innovative",
        "cutting-edge",
        "impactful",
        // Verbs
        "delve",
        "delves",
        "delved",
        "delving",
        "embark",
        "embrace",
        "elevate",
        "foster",
        "harness",
        "unleash",
        "unlock",
        "orchestrate",
        "streamline",
        "transcend",
        "navigate",
        "underscore",
        "showcase",
        "leverage",
        "ensuring",
        "highlighting",
        "emphasizing",
        "reflecting",
        // Nouns
        "landscape",
        "tapestry",
        "journey",
        "paradigm",
        "testament",
        "trajectory",
        "nexus",
        "symphony",
        "spectrum",
        "odyssey",
        "pinnacle",
        "realm",
        "intricacies",
        // Hedging
        "notably",
        "importantly",
        "furthermore",
        "additionally",
        "particularly",
        "significantly",
        "interestingly",
        "remarkably",
        "surprisingly",
        "fascinatingly",
        "moreover",
        "however",
        "overall",
    ];
    let alt = words
        .iter()
        .map(|w| regex::escape(w))
        .collect::<Vec<_>>()
        .join("|");
    Regex::new(&format!("(?i)\\b({alt})\\b")).unwrap()
});

static SLOP_PHRASES: Lazy<Vec<Regex>> = Lazy::new(|| {
    let phrases = [
        "it's worth noting",
        "it's important to note",
        "this is where things get interesting",
        "here's the thing",
        "at the end of the day",
        "in today's fast-paced",
        "as technology continues to",
        "something shifted",
        "everything changed",
        "the answer? it's simpler than you think",
        "what makes this work is",
        "this is exactly",
        "let's break this down",
        "let's dive in",
        "in this post, we'll explore",
        "in this article, we'll",
        "let me know if",
        "would you like me to",
        "i hope this helps",
        "as mentioned earlier",
        "as i mentioned",
        "without further ado",
        "on the other hand",
        "in addition",
        "in summary",
        "in conclusion",
        "you might be wondering",
        "the obvious question is",
        "no discussion would be complete",
        "great question",
        "that's a great",
        "if you want, i can",
        "i can adapt this",
        "i can make this",
        "here are some options",
        "here are a few options",
        "would you prefer",
        "shall i",
        "if you'd like, i can",
        "i can also",
        "in other words",
        "put differently",
        "that is to say",
        "to put it simply",
        "to put it another way",
        "what this means is",
        "the takeaway is",
        "the bottom line is",
        "the key takeaway",
        "the key insight",
    ];
    phrases
        .iter()
        .map(|p| Regex::new(&format!("(?i){}", regex::escape(p))).unwrap())
        .collect()
});

static NOT_JUST_BUT_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"(?i)not (just|only) .{1,40}, but (also )?").unwrap());

static BOLD_HEADER_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"\*\*[^*]+[.:]\*\*\s+\S").unwrap());

static BULLET_LINE_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^(\s*[-*]\s|\s*\d+\.\s)").unwrap());

static TRIADIC_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"(?i)\w+, \w+, and \w+").unwrap());

static META_COMM_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        Regex::new(r"(?i)would you like").unwrap(),
        Regex::new(r"(?i)let me know if").unwrap(),
        Regex::new(r"(?i)as mentioned").unwrap(),
        Regex::new(r"(?i)i hope this").unwrap(),
        Regex::new(r"(?i)feel free to").unwrap(),
        Regex::new(r"(?i)don't hesitate to").unwrap(),
    ]
});

static FALSE_NARRATIVITY_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        Regex::new(r"(?i)then something interesting happened").unwrap(),
        Regex::new(r"(?i)this is where things get interesting").unwrap(),
        Regex::new(r"(?i)that's when everything changed").unwrap(),
    ]
});

static SENTENCE_OPENER_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        Regex::new(r"(?im)(?:^|[.!?]\s+)(certainly[,! ])").unwrap(),
        Regex::new(r"(?im)(?:^|[.!?]\s+)(absolutely[,! ])").unwrap(),
    ]
});

static WEASEL_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        Regex::new(r"(?i)\bsome critics argue\b").unwrap(),
        Regex::new(r"(?i)\bmany believe\b").unwrap(),
        Regex::new(r"(?i)\bexperts suggest\b").unwrap(),
        Regex::new(r"(?i)\bstudies show\b").unwrap(),
        Regex::new(r"(?i)\bsome argue\b").unwrap(),
        Regex::new(r"(?i)\bit is widely believed\b").unwrap(),
        Regex::new(r"(?i)\bresearch suggests\b").unwrap(),
    ]
});

static AI_DISCLOSURE_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        Regex::new(r"(?i)\bas an ai\b").unwrap(),
        Regex::new(r"(?i)\bas a language model\b").unwrap(),
        Regex::new(r"(?i)\bi don't have personal\b").unwrap(),
        Regex::new(r"(?i)\bi cannot browse\b").unwrap(),
        Regex::new(r"(?i)\bup to my last training\b").unwrap(),
        Regex::new(r"(?i)\bas of my (last |knowledge )?cutoff\b").unwrap(),
        Regex::new(r"(?i)\bi'm just an? ai\b").unwrap(),
    ]
});

static PLACEHOLDER_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(
        r"(?i)\[insert [^\]]*\]|\[describe [^\]]*\]|\[url [^\]]*\]|\[your [^\]]*\]|\[todo[^\]]*\]",
    )
    .unwrap()
});

static SENTENCE_SPLIT_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r#"[.!?]["'\u{201D}\u{2019})\]]*(?:\s|$)"#).unwrap());

static EM_DASH_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"\u{2014}| -- ").unwrap());

static CONTRAST_PAIR_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"\b(\w+), not (\w+)\b").unwrap());

static SETUP_RESOLUTION_A_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(concat!(
        r"(?i)\b(this|that|these|those|it|they|we)\s+",
        r"(isn't|aren't|wasn't|weren't|doesn't|don't|didn't|hasn't|haven't|won't|can't|couldn't|shouldn't",
        r"|is\s+not|are\s+not|was\s+not|were\s+not|does\s+not|do\s+not|did\s+not",
        r"|has\s+not|have\s+not|will\s+not|cannot|could\s+not|should\s+not)\b",
        r".{0,80}[.;:,]\s*",
        r"(it's|they're|that's|he's|she's|we're|it\s+is|they\s+are|that\s+is|this\s+is",
        r"|these\s+are|those\s+are|he\s+is|she\s+is|we\s+are|what's|what\s+is",
        r"|the\s+real|the\s+actual|instead|rather)",
    ))
    .unwrap()
});

static SETUP_RESOLUTION_B_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(concat!(
        r"(?i)\b(it's|that's|this\s+is|they're|he's|she's|we're)\s+not\b",
        r".{0,80}[.;:,]\s*",
        r"(it's|they're|that's|he's|she's|we're|it\s+is|they\s+are|that\s+is|this\s+is",
        r"|these\s+are|those\s+are|what's|what\s+is|the\s+real|the\s+actual|instead|rather)",
    ))
    .unwrap()
});

static ELABORATION_COLON_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r": [a-z]").unwrap());

static FENCED_CODE_BLOCK_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"(?s)```.*?```").unwrap());

static JSON_COLON_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r#": ["{\[\d]|: true|: false|: null"#).unwrap());

static PITHY_PIVOT_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"(?i),\s+(?:but|yet|and|not|or)\b").unwrap());

static BULLET_DENSITY_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"(?m)^\s*[-*]\s|^\s*\d+[.)]\s").unwrap());

static BOLD_TERM_BULLET_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"^\s*[-*]\s+\*\*|^\s*\d+[.)]\s+\*\*").unwrap());

static HORIZONTAL_RULE_RE: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"(?m)^\s*(?:---+|\*\*\*+|___+)\s*$").unwrap());

static PUNCT_STRIP_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^[^\w]+|[^\w]+$").unwrap());

// We need a per-line header check (non-multiline)
static MD_HEADER_LINE_SINGLE_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^\s*#").unwrap());

// ---------------------------------------------------------------------------
// Stopwords
// ---------------------------------------------------------------------------

static STOPWORDS: Lazy<std::collections::HashSet<&'static str>> = Lazy::new(|| {
    [
        "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "is", "it",
        "that", "this", "with", "as", "by", "from", "was", "were", "are", "be", "been", "has",
        "have", "had", "not", "no", "do", "does", "did", "will", "would", "could", "should", "can",
        "may", "might", "if", "then", "than", "so", "up", "out", "about", "into", "over", "after",
        "before", "between", "through", "just", "also", "very", "more", "most", "some", "any",
        "each", "every", "all", "both", "few", "other", "such", "only", "own", "same", "too",
        "how", "what", "which", "who", "when", "where", "why",
    ]
    .into_iter()
    .collect()
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

fn context_around(text: &str, start: usize, end: usize, width: usize) -> String {
    let mid = (start + end) / 2;
    let half = width / 2;
    let ctx_start = mid.saturating_sub(half);
    let ctx_end = std::cmp::min(text.len(), mid + half);

    // Ensure we don't slice in the middle of a multi-byte char
    let ctx_start = snap_to_char_boundary(text, ctx_start, false);
    let ctx_end = snap_to_char_boundary(text, ctx_end, true);

    let snippet = text[ctx_start..ctx_end].replace('\n', " ");
    let prefix = if ctx_start > 0 { "..." } else { "" };
    let suffix = if ctx_end < text.len() { "..." } else { "" };
    format!("{prefix}{snippet}{suffix}")
}

/// Snap a byte offset to a valid char boundary.
/// If `forward` is true, snap forward; otherwise snap backward.
fn snap_to_char_boundary(text: &str, pos: usize, forward: bool) -> usize {
    if pos >= text.len() {
        return text.len();
    }
    if text.is_char_boundary(pos) {
        return pos;
    }
    if forward {
        let mut p = pos;
        while p < text.len() && !text.is_char_boundary(p) {
            p += 1;
        }
        p
    } else {
        let mut p = pos;
        while p > 0 && !text.is_char_boundary(p) {
            p -= 1;
        }
        p
    }
}

fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

fn strip_code_blocks(text: &str) -> String {
    FENCED_CODE_BLOCK_RE.replace_all(text, "").into_owned()
}

#[derive(Debug)]
struct NgramResult {
    phrase: String,
    count: usize,
    n: usize,
}

fn find_repeated_ngrams(text: &str, hp: &Hyperparameters) -> Vec<NgramResult> {
    let min_n = hp.repeated_ngram_min_n;
    let max_n = hp.repeated_ngram_max_n;
    let min_count = hp.repeated_ngram_min_count;

    // Tokenize
    let raw_tokens: Vec<&str> = text.split_whitespace().collect();
    let tokens: Vec<String> = raw_tokens
        .iter()
        .filter_map(|t| {
            let stripped = PUNCT_STRIP_RE.replace_all(t, "").to_lowercase();
            if stripped.is_empty() {
                None
            } else {
                Some(stripped)
            }
        })
        .collect();

    if tokens.len() < min_n {
        return vec![];
    }

    // Count n-grams
    let mut ngram_counts: HashMap<Vec<String>, usize> = HashMap::new();
    for n in min_n..=max_n {
        if tokens.len() < n {
            continue;
        }
        for i in 0..=tokens.len() - n {
            let gram: Vec<String> = tokens[i..i + n].to_vec();
            *ngram_counts.entry(gram).or_insert(0) += 1;
        }
    }

    // Filter: count >= min_count AND not all stopwords
    let repeated: HashMap<Vec<String>, usize> = ngram_counts
        .into_iter()
        .filter(|(gram, count)| {
            *count >= min_count && !gram.iter().all(|w| STOPWORDS.contains(w.as_str()))
        })
        .collect();

    if repeated.is_empty() {
        return vec![];
    }

    // Suppress sub-n-grams
    let mut sorted_grams: Vec<(&Vec<String>, &usize)> = repeated.iter().collect();
    sorted_grams.sort_by(|a, b| b.0.len().cmp(&a.0.len()));

    let mut to_remove: std::collections::HashSet<Vec<String>> = std::collections::HashSet::new();
    for i in 0..sorted_grams.len() {
        let longer = sorted_grams[i].0;
        let longer_str = longer.join(" ");
        let longer_count = *sorted_grams[i].1;
        for &(shorter, &shorter_count) in sorted_grams.iter().skip(i + 1) {
            if to_remove.contains(shorter) {
                continue;
            }
            let shorter_str = shorter.join(" ");
            if longer_str.contains(&shorter_str) && longer_count >= shorter_count {
                to_remove.insert(shorter.clone());
            }
        }
    }

    // Sort by (-length, -count)
    let mut result_grams: Vec<(&Vec<String>, &usize)> = repeated
        .iter()
        .filter(|(gram, _)| !to_remove.contains(*gram))
        .collect();
    result_grams.sort_by(|a, b| b.0.len().cmp(&a.0.len()).then_with(|| b.1.cmp(a.1)));

    result_grams
        .into_iter()
        .map(|(gram, &count)| NgramResult {
            phrase: gram.join(" "),
            count,
            n: gram.len(),
        })
        .collect()
}

pub(crate) fn split_sentences(text: &str) -> Vec<String> {
    SENTENCE_SPLIT_RE
        .split(text)
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect()
}

#[cfg(test)]
pub(crate) fn split_lines(text: &str) -> Vec<&str> {
    text.split('\n').collect()
}

// ---------------------------------------------------------------------------
// Initial counts
// ---------------------------------------------------------------------------

fn initial_counts() -> HashMap<String, usize> {
    let mut m = HashMap::new();
    for key in RULE_NAMES {
        m.insert(key.to_string(), 0);
    }
    m
}

// ---------------------------------------------------------------------------
// Rule implementations
// ---------------------------------------------------------------------------

#[derive(Debug)]
pub(crate) struct RuleOutput {
    pub violations: Vec<Violation>,
    pub advice: Vec<String>,
    pub count_deltas: HashMap<String, usize>,
}

impl RuleOutput {
    fn new() -> Self {
        Self {
            violations: Vec::new(),
            advice: Vec::new(),
            count_deltas: HashMap::new(),
        }
    }

    fn inc(&mut self, key: &str) {
        *self.count_deltas.entry(key.to_string()).or_insert(0) += 1;
    }
}

pub(crate) fn rule_slop_words(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;
    for m in SLOP_WORD_RE.find_iter(text) {
        let word = m.as_str().to_lowercase();
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "slop_word".to_string(),
            match_text: word.clone(),
            context: context_around(text, m.start(), m.end(), width),
            penalty: hp.slop_word_penalty,
        });
        out.advice.push(format!(
            "Replace '{word}' \u{2014} what specifically do you mean?"
        ));
        out.inc("slop_words");
    }
    out
}

pub(crate) fn rule_slop_phrases(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    for pat in SLOP_PHRASES.iter() {
        for m in pat.find_iter(text) {
            let phrase = m.as_str().to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "slop_phrase".to_string(),
                match_text: phrase.clone(),
                context: context_around(text, m.start(), m.end(), width),
                penalty: hp.slop_phrase_penalty,
            });
            out.advice.push(format!(
                "Cut '{phrase}' \u{2014} just state the point directly."
            ));
            out.inc("slop_phrases");
        }
    }

    for m in NOT_JUST_BUT_RE.find_iter(text) {
        let phrase = m.as_str().trim().to_lowercase();
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "slop_phrase".to_string(),
            match_text: phrase.clone(),
            context: context_around(text, m.start(), m.end(), width),
            penalty: hp.slop_phrase_penalty,
        });
        out.advice.push(format!(
            "Cut '{phrase}' \u{2014} just state the point directly."
        ));
        out.inc("slop_phrases");
    }
    out
}

pub(crate) fn rule_structural(text: &str, lines: &[&str], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    // Bold headers
    let bold_matches: Vec<_> = BOLD_HEADER_RE.find_iter(text).collect();
    if bold_matches.len() >= hp.structural_bold_header_min {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "bold_header_explanation".to_string(),
            context: format!(
                "Found {} instances of **Bold.** pattern",
                bold_matches.len()
            ),
            penalty: hp.structural_bold_header_penalty,
        });
        out.advice.push(format!(
            "Vary paragraph structure \u{2014} {} bold-header-explanation blocks in a row reads as LLM listicle.",
            bold_matches.len()
        ));
        out.inc("structural");
    }

    // Bullet runs
    let mut run_length: usize = 0;
    for line in lines {
        if BULLET_LINE_RE.is_match(line) {
            run_length += 1;
        } else {
            if run_length >= hp.structural_bullet_run_min {
                out.violations.push(Violation {
                    violation_type: "Violation".to_string(),
                    rule: "structural".to_string(),
                    match_text: "excessive_bullets".to_string(),
                    context: format!("Run of {run_length} consecutive bullet lines"),
                    penalty: hp.structural_bullet_run_penalty,
                });
                out.advice.push(format!(
                    "Consider prose instead of this {run_length}-item bullet list."
                ));
                out.inc("structural");
            }
            run_length = 0;
        }
    }
    if run_length >= hp.structural_bullet_run_min {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "excessive_bullets".to_string(),
            context: format!("Run of {run_length} consecutive bullet lines"),
            penalty: hp.structural_bullet_run_penalty,
        });
        out.advice.push(format!(
            "Consider prose instead of this {run_length}-item bullet list."
        ));
        out.inc("structural");
    }

    // Triadic
    let triadic_matches: Vec<_> = TRIADIC_RE.find_iter(text).collect();
    let triadic_count = triadic_matches.len();
    for m in triadic_matches.iter().take(hp.triadic_record_cap) {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "triadic".to_string(),
            context: context_around(text, m.start(), m.end(), width),
            penalty: hp.triadic_penalty,
        });
        out.inc("structural");
    }
    if triadic_count >= hp.triadic_advice_min {
        out.advice.push(format!(
            "{triadic_count} triadic structures ('X, Y, and Z') \u{2014} vary your list cadence."
        ));
    }

    out
}

pub(crate) fn rule_tone(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    for pat in META_COMM_PATTERNS.iter() {
        for m in pat.find_iter(text) {
            let phrase = m.as_str().to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "tone".to_string(),
                match_text: phrase.clone(),
                context: context_around(text, m.start(), m.end(), width),
                penalty: hp.tone_penalty,
            });
            out.advice.push(format!(
                "Remove '{phrase}' \u{2014} this is a direct AI tell."
            ));
            out.inc("tone");
        }
    }

    for pat in FALSE_NARRATIVITY_PATTERNS.iter() {
        for m in pat.find_iter(text) {
            let phrase = m.as_str().to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "tone".to_string(),
                match_text: phrase.clone(),
                context: context_around(text, m.start(), m.end(), width),
                penalty: hp.tone_penalty,
            });
            out.advice
                .push(format!("Cut '{phrase}' \u{2014} announce less, show more."));
            out.inc("tone");
        }
    }

    for pat in SENTENCE_OPENER_PATTERNS.iter() {
        for caps in pat.captures_iter(text) {
            let full = caps.get(0).unwrap();
            let word_match = caps.get(1).unwrap();
            let word = word_match
                .as_str()
                .trim_matches(|c: char| c == ',' || c == '!' || c == ' ')
                .to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "tone".to_string(),
                match_text: word.clone(),
                context: context_around(text, full.start(), full.end(), width),
                penalty: hp.sentence_opener_penalty,
            });
            out.advice.push(format!(
                "'{word}' as a sentence opener is an AI tell \u{2014} just make the point."
            ));
            out.inc("tone");
        }
    }

    out
}

pub(crate) fn rule_weasel(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    for pat in WEASEL_PATTERNS.iter() {
        for m in pat.find_iter(text) {
            let phrase = m.as_str().to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "weasel".to_string(),
                match_text: phrase.clone(),
                context: context_around(text, m.start(), m.end(), width),
                penalty: hp.weasel_penalty,
            });
            out.advice.push(format!(
                "Cut '{phrase}' \u{2014} either cite a source or own the claim."
            ));
            out.inc("weasel");
        }
    }
    out
}

pub(crate) fn rule_ai_disclosure(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    for pat in AI_DISCLOSURE_PATTERNS.iter() {
        for m in pat.find_iter(text) {
            let phrase = m.as_str().to_lowercase();
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "ai_disclosure".to_string(),
                match_text: phrase.clone(),
                context: context_around(text, m.start(), m.end(), width),
                penalty: hp.ai_disclosure_penalty,
            });
            out.advice.push(format!(
                "Remove '{phrase}' \u{2014} AI self-disclosure in authored prose is a critical tell."
            ));
            out.inc("ai_disclosure");
        }
    }
    out
}

pub(crate) fn rule_placeholder(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    for m in PLACEHOLDER_RE.find_iter(text) {
        let match_text = m.as_str().to_lowercase();
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "placeholder".to_string(),
            match_text: match_text.clone(),
            context: context_around(text, m.start(), m.end(), width),
            penalty: hp.placeholder_penalty,
        });
        out.advice.push(format!(
            "Remove placeholder '{match_text}' \u{2014} this is unfinished template text."
        ));
        out.inc("placeholder");
    }
    out
}

pub(crate) fn rule_rhythm(sentences: &[String], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    if sentences.len() < hp.rhythm_min_sentences {
        return out;
    }

    let lengths: Vec<f64> = sentences
        .iter()
        .map(|s| s.split_whitespace().count() as f64)
        .collect();
    let mean = lengths.iter().sum::<f64>() / lengths.len() as f64;
    if mean <= 0.0 {
        return out;
    }

    let variance = lengths.iter().map(|x| (x - mean).powi(2)).sum::<f64>() / lengths.len() as f64;
    let std = variance.sqrt();
    let cv = std / mean;

    if cv < hp.rhythm_cv_threshold {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "rhythm".to_string(),
            match_text: "monotonous_rhythm".to_string(),
            context: format!(
                "CV={cv:.2} across {} sentences (mean {mean:.1} words)",
                sentences.len()
            ),
            penalty: hp.rhythm_penalty,
        });
        out.advice.push(format!(
            "Sentence lengths are too uniform (CV={cv:.2}) \u{2014} vary short and long."
        ));
        out.inc("rhythm");
    }
    out
}

pub(crate) fn rule_em_dash_density(text: &str, wc: usize, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    if wc == 0 {
        return out;
    }

    let em_dash_count = EM_DASH_RE.find_iter(text).count();
    let ratio_per_150 = (em_dash_count as f64 / wc as f64) * hp.em_dash_words_basis;
    if ratio_per_150 > hp.em_dash_density_threshold {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "em_dash".to_string(),
            match_text: "em_dash_density".to_string(),
            context: format!(
                "{em_dash_count} em dashes in {wc} words ({ratio_per_150:.1} per 150 words)"
            ),
            penalty: hp.em_dash_penalty,
        });
        out.advice.push(format!(
            "Too many em dashes ({em_dash_count} in {wc} words) \u{2014} use other punctuation."
        ));
        out.inc("em_dash");
    }
    out
}

pub(crate) fn rule_contrast_pairs(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    let matches: Vec<_> = CONTRAST_PAIR_RE.find_iter(text).collect();
    let count = matches.len();

    for m in matches.iter().take(hp.contrast_record_cap) {
        let matched = m.as_str().to_string();
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "contrast_pair".to_string(),
            match_text: matched.clone(),
            context: context_around(text, m.start(), m.end(), width),
            penalty: hp.contrast_penalty,
        });
        out.advice.push(format!(
            "'{matched}' \u{2014} 'X, not Y' contrast \u{2014} consider rephrasing to avoid the Claude pattern."
        ));
        out.inc("contrast_pairs");
    }

    if count >= hp.contrast_advice_min {
        out.advice.push(format!(
            "{count} 'X, not Y' contrasts \u{2014} this is a Claude rhetorical tic. Vary your phrasing."
        ));
    }
    out
}

pub(crate) fn rule_setup_resolution(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let width = hp.context_window_chars;

    let mut setup_res_recorded = 0usize;
    for pat in [&*SETUP_RESOLUTION_A_RE, &*SETUP_RESOLUTION_B_RE] {
        for m in pat.find_iter(text) {
            if setup_res_recorded < hp.setup_resolution_record_cap {
                let matched = m.as_str().to_string();
                out.violations.push(Violation {
                    violation_type: "Violation".to_string(),
                    rule: "setup_resolution".to_string(),
                    match_text: matched.clone(),
                    context: context_around(text, m.start(), m.end(), width),
                    penalty: hp.setup_resolution_penalty,
                });
                out.advice.push(format!(
                    "'{matched}' \u{2014} setup-and-resolution is a Claude rhetorical tic. Just state the point directly."
                ));
                setup_res_recorded += 1;
            }
            out.inc("setup_resolution");
        }
    }
    out
}

pub(crate) fn rule_colon_density(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let stripped_text = strip_code_blocks(text);
    let mut colon_count = 0usize;

    for line in stripped_text.split('\n') {
        if MD_HEADER_LINE_SINGLE_RE.is_match(line) {
            continue;
        }
        for cm in ELABORATION_COLON_RE.find_iter(line) {
            let col_pos = cm.start();
            let before = &line[..col_pos + 1];
            if before.ends_with("http:") || before.ends_with("https:") {
                continue;
            }
            let snippet_end = std::cmp::min(col_pos + 10, line.len());
            let snippet_end = snap_to_char_boundary(line, snippet_end, true);
            let snippet = &line[col_pos..snippet_end];
            if JSON_COLON_RE.is_match(snippet) {
                continue;
            }
            colon_count += 1;
        }
    }

    let stripped_wc = word_count(&stripped_text);
    if stripped_wc == 0 {
        return out;
    }

    let colon_ratio_per_150 = (colon_count as f64 / stripped_wc as f64) * hp.colon_words_basis;
    if colon_ratio_per_150 > hp.colon_density_threshold {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "colon_density".to_string(),
            match_text: "colon_density".to_string(),
            context: format!(
                "{colon_count} elaboration colons in {stripped_wc} words ({colon_ratio_per_150:.1} per 150 words)"
            ),
            penalty: hp.colon_density_penalty,
        });
        out.advice.push(format!(
            "Too many elaboration colons ({colon_count} in {stripped_wc} words) \u{2014} use periods or restructure sentences."
        ));
        out.inc("colon_density");
    }
    out
}

pub(crate) fn rule_pithy_fragments(sentences: &[String], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();
    let mut pithy_count = 0usize;

    for sent in sentences {
        let s = sent.trim();
        if s.is_empty() {
            continue;
        }
        let sent_words: Vec<&str> = s.split_whitespace().collect();
        if sent_words.len() > hp.pithy_max_sentence_words {
            continue;
        }
        if PITHY_PIVOT_RE.is_match(s) {
            if pithy_count < hp.pithy_record_cap {
                out.violations.push(Violation {
                    violation_type: "Violation".to_string(),
                    rule: "pithy_fragment".to_string(),
                    match_text: s.to_string(),
                    context: s.to_string(),
                    penalty: hp.pithy_penalty,
                });
                out.advice.push(format!(
                    "'{s}' \u{2014} pithy evaluative fragments are a Claude tell. Expand or cut."
                ));
            }
            pithy_count += 1;
            out.inc("pithy_fragment");
        }
    }
    out
}

pub(crate) fn rule_bullet_density(lines: &[&str], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let non_empty: Vec<&&str> = lines.iter().filter(|l| !l.trim().is_empty()).collect();
    let total_non_empty = non_empty.len();
    if total_non_empty == 0 {
        return out;
    }

    let bullet_count = non_empty
        .iter()
        .filter(|l| BULLET_DENSITY_RE.is_match(l))
        .count();
    let bullet_ratio = bullet_count as f64 / total_non_empty as f64;
    if bullet_ratio > hp.bullet_density_threshold {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "bullet_density".to_string(),
            context: format!(
                "{bullet_count} of {total_non_empty} non-empty lines are bullets ({:.0}%)",
                bullet_ratio * 100.0
            ),
            penalty: hp.bullet_density_penalty,
        });
        out.advice.push(format!(
            "Over {:.0}% of lines are bullets \u{2014} write prose instead of lists.",
            bullet_ratio * 100.0
        ));
        out.inc("bullet_density");
    }
    out
}

pub(crate) fn rule_blockquote_density(lines: &[&str], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let mut in_code_block = false;
    let mut blockquote_count = 0usize;
    for line in lines {
        if line.trim().starts_with("```") {
            in_code_block = !in_code_block;
            continue;
        }
        if !in_code_block && line.starts_with('>') {
            blockquote_count += 1;
        }
    }

    if blockquote_count >= hp.blockquote_min_lines {
        let excess = blockquote_count - hp.blockquote_free_lines;
        let capped = std::cmp::min(excess, hp.blockquote_cap);
        let bq_penalty = hp.blockquote_penalty_step * capped as i32;
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "blockquote_density".to_string(),
            context: format!(
                "{blockquote_count} blockquote lines \u{2014} Claude uses these as thesis statements"
            ),
            penalty: bq_penalty,
        });
        out.advice.push(format!(
            "{blockquote_count} blockquotes \u{2014} integrate key claims into prose instead of pulling them out as blockquotes."
        ));
        out.inc("blockquote_density");
    }
    out
}

pub(crate) fn rule_bold_bullet_runs(lines: &[&str], hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let mut bold_bullet_run = 0usize;
    for line in lines {
        if BOLD_TERM_BULLET_RE.is_match(line) {
            bold_bullet_run += 1;
            continue;
        }
        if bold_bullet_run >= hp.bold_bullet_run_min {
            out.violations.push(Violation {
                violation_type: "Violation".to_string(),
                rule: "structural".to_string(),
                match_text: "bold_bullet_list".to_string(),
                context: format!("Run of {bold_bullet_run} bold-term bullets"),
                penalty: hp.bold_bullet_run_penalty,
            });
            out.advice.push(format!(
                "Run of {bold_bullet_run} bold-term bullets \u{2014} this is an LLM listicle pattern. Use varied paragraph structure."
            ));
            out.inc("bold_bullet_list");
        }
        bold_bullet_run = 0;
    }
    if bold_bullet_run >= hp.bold_bullet_run_min {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "bold_bullet_list".to_string(),
            context: format!("Run of {bold_bullet_run} bold-term bullets"),
            penalty: hp.bold_bullet_run_penalty,
        });
        out.advice.push(format!(
            "Run of {bold_bullet_run} bold-term bullets \u{2014} this is an LLM listicle pattern. Use varied paragraph structure."
        ));
        out.inc("bold_bullet_list");
    }
    out
}

pub(crate) fn rule_horizontal_rules(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let hr_count = HORIZONTAL_RULE_RE.find_iter(text).count();
    if hr_count >= hp.horizontal_rule_min {
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "structural".to_string(),
            match_text: "horizontal_rules".to_string(),
            context: format!("{hr_count} horizontal rules \u{2014} excessive section dividers"),
            penalty: hp.horizontal_rule_penalty,
        });
        out.advice.push(format!(
            "{hr_count} horizontal rules \u{2014} section headers alone are sufficient, dividers are a crutch."
        ));
        out.inc("horizontal_rules");
    }
    out
}

pub(crate) fn rule_phrase_reuse(text: &str, hp: &Hyperparameters) -> RuleOutput {
    let mut out = RuleOutput::new();

    let repeated = find_repeated_ngrams(text, hp);
    for (recorded, ng) in repeated.iter().enumerate() {
        if recorded >= hp.phrase_reuse_record_cap {
            break;
        }
        out.violations.push(Violation {
            violation_type: "Violation".to_string(),
            rule: "phrase_reuse".to_string(),
            match_text: ng.phrase.clone(),
            context: format!(
                "'{}' ({}-word phrase) appears {} times",
                ng.phrase, ng.n, ng.count
            ),
            penalty: hp.phrase_reuse_penalty,
        });
        out.advice.push(format!(
            "'{}' appears {} times \u{2014} vary your phrasing to avoid repetition.",
            ng.phrase, ng.count
        ));
        out.inc("phrase_reuse");
    }
    out
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

fn compute_weighted_sum(
    violations: &[Violation],
    counts: &HashMap<String, usize>,
    hp: &Hyperparameters,
) -> f64 {
    let mut weighted_sum = 0.0f64;
    for v in violations {
        let penalty = v.penalty.unsigned_abs() as f64;
        let rule = &v.rule;

        let is_claude_cat = hp.claude_categories.iter().any(|c| c == rule)
            || hp
                .claude_categories
                .iter()
                .any(|c| c == &format!("{rule}s"));

        // Get the count for the rule
        let cat_count = counts
            .get(rule.as_str())
            .copied()
            .unwrap_or(0)
            .max(counts.get(&format!("{rule}s")).copied().unwrap_or(0));

        if is_claude_cat && cat_count > 1 {
            let weight = penalty * (1.0 + hp.concentration_alpha * (cat_count as f64 - 1.0));
            weighted_sum += weight;
        } else {
            weighted_sum += penalty;
        }
    }
    weighted_sum
}

fn band_for_score(score: i32, hp: &Hyperparameters) -> &'static str {
    if score >= hp.band_clean_min {
        "clean"
    } else if score >= hp.band_light_min {
        "light"
    } else if score >= hp.band_moderate_min {
        "moderate"
    } else if score >= hp.band_heavy_min {
        "heavy"
    } else {
        "saturated"
    }
}

fn deduplicate_advice(advice: Vec<String>) -> Vec<String> {
    let mut seen = std::collections::HashSet::new();
    let mut unique = Vec::new();
    for item in advice {
        if seen.insert(item.clone()) {
            unique.push(item);
        }
    }
    unique
}

// ---------------------------------------------------------------------------
// Merge helper
// ---------------------------------------------------------------------------

fn merge_output(
    violations: &mut Vec<Violation>,
    advice: &mut Vec<String>,
    counts: &mut HashMap<String, usize>,
    out: RuleOutput,
) {
    violations.extend(out.violations);
    advice.extend(out.advice);
    for (key, delta) in out.count_deltas {
        if delta > 0 {
            *counts.entry(key).or_insert(0) += delta;
        }
    }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

pub fn analyze(text: &str) -> AnalysisResult {
    analyze_with_config(text, &Hyperparameters::default())
}

pub fn analyze_with_config(text: &str, hp: &Hyperparameters) -> AnalysisResult {
    let wc = word_count(text);
    let counts_init = initial_counts();

    if wc < hp.short_text_word_count {
        return AnalysisResult {
            score: hp.score_max,
            band: "clean".to_string(),
            word_count: wc,
            violations: vec![],
            counts: counts_init,
            total_penalty: 0,
            weighted_sum: 0.0,
            density: 0.0,
            advice: vec![],
        };
    }

    let lines: Vec<&str> = text.split('\n').collect();
    let sentences: Vec<String> = split_sentences(text);

    let mut violations: Vec<Violation> = Vec::new();
    let mut advice: Vec<String> = Vec::new();
    let mut counts = counts_init;

    // 1. Slop words
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_slop_words(text, hp),
    );
    // 2. Slop phrases
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_slop_phrases(text, hp),
    );
    // 3. Structural
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_structural(text, &lines, hp),
    );
    // 4. Tone
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_tone(text, hp),
    );
    // 5. Weasel
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_weasel(text, hp),
    );
    // 6. AI disclosure
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_ai_disclosure(text, hp),
    );
    // 7. Placeholder
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_placeholder(text, hp),
    );
    // 8. Rhythm
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_rhythm(&sentences, hp),
    );
    // 9. Em dash density
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_em_dash_density(text, wc, hp),
    );
    // 10. Contrast pairs
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_contrast_pairs(text, hp),
    );
    // 11. Setup-resolution
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_setup_resolution(text, hp),
    );
    // 12. Colon density
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_colon_density(text, hp),
    );
    // 13. Pithy fragments
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_pithy_fragments(&sentences, hp),
    );
    // 14. Bullet density
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_bullet_density(&lines, hp),
    );
    // 15. Blockquote density
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_blockquote_density(&lines, hp),
    );
    // 16. Bold bullet runs
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_bold_bullet_runs(&lines, hp),
    );
    // 17. Horizontal rules
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_horizontal_rules(text, hp),
    );
    // 18. Phrase reuse
    merge_output(
        &mut violations,
        &mut advice,
        &mut counts,
        rule_phrase_reuse(text, hp),
    );

    let total_penalty: i32 = violations.iter().map(|v| v.penalty).sum();
    let weighted_sum = compute_weighted_sum(&violations, &counts, hp);
    let density = if wc > 0 {
        weighted_sum / (wc as f64 / hp.density_words_basis)
    } else {
        0.0
    };
    let raw_score = hp.score_max as f64 * (-hp.decay_lambda * density).exp();
    let score = (raw_score.round() as i32).clamp(hp.score_min, hp.score_max);
    let band = band_for_score(score, hp).to_string();

    AnalysisResult {
        score,
        band,
        word_count: wc,
        violations,
        counts,
        total_penalty,
        weighted_sum: (weighted_sum * 100.0).round() / 100.0,
        density: (density * 100.0).round() / 100.0,
        advice: deduplicate_advice(advice),
    }
}

#[cfg(test)]
mod rule_tests;
