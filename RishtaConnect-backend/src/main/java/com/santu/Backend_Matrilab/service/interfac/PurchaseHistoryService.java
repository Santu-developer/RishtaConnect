package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.PurchaseHistoryDTO;
import com.santu.Backend_Matrilab.dto.response.PurchaseHistoryResponse;

import java.util.List;

public interface PurchaseHistoryService {
    PurchaseHistoryResponse createPurchaseHistory(PurchaseHistoryDTO purchaseHistoryDTO);
    PurchaseHistoryResponse getPurchaseHistoryById(Long id);
    List<PurchaseHistoryResponse> getAllPurchaseHistories();
    void deletePurchaseHistory(Long id);
}
