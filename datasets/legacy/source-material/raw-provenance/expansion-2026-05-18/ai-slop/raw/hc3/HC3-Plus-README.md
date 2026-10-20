# chatgpt-comparison-detection-HC3-Plus
In order to fill the gap of HC3 under semanticinvariant tasks, we extend HC3 and propose a larger ChatGPT-generated text dataset covering translation, summarization, and paraphrasing tasks, called HC3 Plus. Details can be found in [HC3 Plus: A Semantic-Invariant Human ChatGPT Comparison Corpus](https://arxiv.org/abs/2309.02731)

## Dataset
To build the HC3 semantic-invariance Datset, We first select several widely used high-quality corpora that were annotated by humans, encompassing translation, summarization, and paraphrasing tasks. The main datasets included are: [CNN/DailyMail](https://doi.org/10.18653/v1/P17-1099), [Xsum](https://aclanthology.org/D18-1206/), [LCSTS](https://aclanthology.org/D15-1229/), [news2016](https://doi.org/10.18653/v1/2020.coling-main.419), [WMT](https://machinetranslate.org/wmt), [HC3 Question Paraphrase](https://github.com/Hello-SimpleAI/chatgpt-comparison-detection/tree/main). Then, we merge the HC3 dataset to create the complete HC3 Plus dataset. The merged data is located in the [data directory](https://github.com/suu990901/chatgpt-comparison-detection-HC3-Plus/tree/main/data).

```
data/
    en/ # English Dataset
        train.jsonl # The training set includes both HC3-SI and HC3 datasets.
        val_hc3_si.sjonl # The validation set of HC3-SI dataset.
        val_hc3_QA.jsonl # The validation set of HC3 dataset.
        test_hc3_si.sjonl # The test set of HC3-SI dataset.
        test_hc3_QA.jsonl # The test set of HC3 dataset.
    zh/ # Chinese Dataset
        train.jsonl # The training set includes both HC3-SI and HC3 datasets.
        val_hc3_si.sjonl # The validation set of HC3-SI dataset.
        val_hc3_QA.jsonl # The validation set of HC3 dataset.
        test_hc3_si.sjonl # The test set of HC3-SI dataset.
        test_hc3_QA.jsonl # The test set of HC3 dataset.
```

## Training
We train detectors for both English and Chinese based on [Tk-instruct](https://github.com/allenai/natural-instructions) and Roberta, respectively.
### English
For the English detector, we use the following command for training:
```
bash train_english_roberta.sh # Train the Roberta model.
bash train_english_s2s.sh # Train the Tk-instruct.
```
### Chinese
For the Chinese detector, we use the following command for training:
```
bash train_chinese_roberta.sh # Train the Roberta model.
bash train_chinese_s2s.sh # Train the Tk-instruct.
```

## Evaluation
You can use the following command to obtain the scores on the test set based on the Roberta:
```
python test_roberta.py --data_path data/en/test_hc3_QA.jsonl -- model_path ${model_path}
python test_roberta.py --data_path data/en/test_hc3_si.jsonl -- model_path ${model_path}
```
You can use the following command to obtain the scores on the test set based on the Tk-instruct:
```
python test_s2s.py --data_path data/en/test_hc3_QA.jsonl -- model_path ${model_path} --lang en
python test_s2s.py --data_path data/en/test_hc3_si.jsonl -- model_path ${model_path} --lang en
```
